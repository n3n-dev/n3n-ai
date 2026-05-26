# CI/CD · K8s 배포 설계 (n3nai)

- 작성일: 2026-05-26
- 상태: 설계 합의 완료 → 구현 플랜 작성 대기
- 레퍼런스 구현: `/Users/user/projects/jikji_homepage_static` (사내 표준 패턴)

---

## 1. 배경과 목표

n3nai는 Vite + React 19 + TypeScript로 빌드되는 정적 SPA다. 현재 `.github/workflows/deploy.yml`은 GitHub Pages용으로 작성되어 있으나 트리거 브랜치(`master`)가 실제 브랜치(`main`, `draft1`, `draft2`)와 일치하지 않아 동작하지 않는 상태다.

본 작업은 다음을 목표로 한다.

1. **컨테이너화**: dist를 `node:20-alpine + npm run start`(serve -s dist) 형태로 컨테이너 이미지화
2. **GHCR 푸시**: `ghcr.io/n3n-dev/n3nai`로 이미지 배포
3. **클러스터 분기 배포**: `draft1` push → d2 클러스터, `main` push → prod 클러스터
4. **사내 표준 정렬**: jikji_homepage_static 패턴(레지스트리·Ingress class·도메인 컨벤션·매니페스트 구조·워크플로우 골격)을 그대로 따른다

---

## 2. 아키텍처 개요

```
                  ┌──────────────────┐
   git push       │  GitHub Actions  │
  draft1 / main ─▶│  build-and-push  │── push ──▶ ghcr.io/n3n-dev/n3nai:sha-<sha>
                  └────────┬─────────┘                            +:latest
                           │
                           ▼
                  ┌──────────────────┐
                  │  deploy (self-h) │   Actions Runner System
                  └────────┬─────────┘
            ┌──────────────┴──────────────┐
   draft1 ─▶│                             │◀─ main
            ▼                             ▼
   ┌────────────────┐            ┌────────────────┐
   │ d2 cluster     │            │ prod cluster   │
   │ ns:homepage-   │            │ ns:homepage-   │
   │  n3n-ai        │            │  n3n-ai        │
   │ Ingress:traefik│            │ Ingress:traefik│
   │ host:n3n-ai-   │            │ host:n3n.ai,   │
   │  dev.d2.       │            │       www.n3n. │
   │  nthreen.com   │            │       ai       │
   └────────────────┘            └────────────────┘
```

**핵심 분기점**: deploy job 안에서 `github.ref`로 `d2` / `prod` 환경 변수를 결정하고, 해당 환경의 kubeconfig 시크릿과 매니페스트 디렉토리를 선택한다.

---

## 3. 컨테이너 이미지 설계

### 3.1 Dockerfile (`/Dockerfile`)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
```

- jikji 사내 표준 골격을 유지하되, COPY 대상이 `.next` → `dist`로 바뀌고 시작 명령이 `next start` → `serve -s dist`로 바뀐다.
- jikji와 동일하게 nginx/caddy 같은 별도 정적 서버를 두지 않고 Node 기반 정적 서버로 통일.

### 3.2 `package.json` 변경

추가:

- `"scripts"."start": "serve -s dist -l 3000"`
- `"dependencies"."serve": "^14.2.4"` (devDeps 아님 — 런타임에 필요)

선택 이유:

- `serve -s` 플래그가 SPA fallback(존재하지 않는 경로 → `index.html`)을 자동 처리
- Vite 공식 `preview`는 production 비권장이라 사용 안 함

---

## 4. K8s 매니페스트 설계

### 4.1 디렉토리 구조

```
k8s/
├── d2/
│   └── combined.yaml
└── prod/
    └── combined.yaml
```

- jikji의 단일 `k8s/combined.yaml` 패턴을 따르되, 환경별 분리.
- `combined.yaml`이 deploy의 source of truth(Deployment + Service + Ingress 합본).
- Kustomize/Helm 도입하지 않음(사내 표준에 없음).

### 4.2 공통 리소스 (d2/prod 동일)

| 리소스          | 이름              | 비고                                    |
| --------------- | ----------------- | --------------------------------------- |
| Namespace       | `homepage-n3n-ai` | 클러스터가 분리되어 양쪽 동일 이름 사용 |
| Deployment      | `n3nai`           | containerPort 3000                      |
| Service         | `n3nai-svc`       | port 80 → targetPort 3000               |
| Ingress         | `n3nai-ingress`   | `ingressClassName: traefik`             |
| imagePullSecret | `ghcr-secret`     | 각 namespace에 미리 생성됨              |

### 4.3 환경별 차이

| 항목                       | d2                          | prod                                                                  |
| -------------------------- | --------------------------- | --------------------------------------------------------------------- |
| `Deployment.spec.replicas` | 1                           | 2                                                                     |
| Ingress hosts              | `n3n-ai-dev.d2.nthreen.com` | `n3n.ai`, `www.n3n.ai` 둘 다 매핑(redirect는 추후 traefik middleware) |
| TLS                        | 미적용 (HTTP — jikji 표준)  | 와일드카드 인증서 존재 추정 → 확인 후 `spec.tls:` 추가                |

### 4.4 d2 매니페스트 (`k8s/d2/combined.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n3nai
  namespace: homepage-n3n-ai
spec:
  replicas: 1
  selector:
    matchLabels:
      app: n3nai
  template:
    metadata:
      labels:
        app: n3nai
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
        - name: n3nai
          image: ghcr.io/n3n-dev/n3nai:latest
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: n3nai-svc
  namespace: homepage-n3n-ai
spec:
  selector:
    app: n3nai
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: n3nai-ingress
  namespace: homepage-n3n-ai
spec:
  ingressClassName: traefik
  rules:
    - host: n3n-ai-dev.d2.nthreen.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: n3nai-svc
                port:
                  number: 80
```

### 4.5 prod 매니페스트 (`k8s/prod/combined.yaml`)

d2와 동일하되 다음 변경:

- `Deployment.spec.replicas: 2`
- Ingress `rules`에 `n3n.ai`와 `www.n3n.ai` 두 host를 동일 backend로 매핑
- TLS 인증서 확인 후 `spec.tls:` 추가 예정

```yaml
# ... (Deployment.replicas: 2, Service 동일)
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: n3nai-ingress
  namespace: homepage-n3n-ai
spec:
  ingressClassName: traefik
  # tls:
  #   - hosts: [n3n.ai, www.n3n.ai]
  #     secretName: <확인 후 채움>
  rules:
    - host: n3n.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: n3nai-svc
                port:
                  number: 80
    - host: www.n3n.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: n3nai-svc
                port:
                  number: 80
```

---

## 5. GitHub Actions 워크플로우 설계

### 5.1 파일: `.github/workflows/deploy.yml`

기존 GitHub Pages용 파일을 **새 워크플로우로 덮어쓴다**(별도 삭제 단계 없음).

### 5.2 트리거

```yaml
on:
  push:
    branches: [draft1, main]
```

- `draft2` 브랜치는 무시.

### 5.3 Job 1 — `build-and-push`

- `runs-on: ubuntu-latest`
- `permissions: contents:read, packages:write`
- GHCR 로그인(`docker/login-action@v3`) → buildx → `docker/build-push-action@v5`로 빌드 & 푸시
- platforms: `linux/amd64`
- 태그: `:latest` + `:sha-${{ github.sha }}` (jikji 컨벤션)

### 5.4 Job 2 — `deploy`

- `runs-on: self-hosted` (사내 Actions Runner System; 정확한 라벨 사용자 확인 필요)
- `needs: build-and-push`
- 시퀀스:
  1. `actions/checkout@v4`
  2. `azure/setup-kubectl@v3` (v1.28.0)
  3. **target 환경 분기 (`github.ref` 기반)**: `draft1` → `d2`, `main` → `prod`
  4. **kubeconfig 파일로 작성**: 시크릿을 `$RUNNER_TEMP/.kube/config`로 직접 기록(step output 경유 금지 → 마스킹 풀림 방지)
     - d2면 `KUBECONFIG_D2`, prod면 `KUBECONFIG_PROD` 시크릿 사용
  5. **배포**:
     - `kubectl apply -f k8s/<env>/combined.yaml` (먼저 리소스 적용)
     - `kubectl -n $NAMESPACE set image deployment/n3nai n3nai=$IMAGE:sha-<sha>`
     - `kubectl -n $NAMESPACE rollout status deployment/n3nai --timeout=120s`
  6. **실패 시 자동 롤백** (`if: failure()`):
     - `kubectl -n $NAMESPACE rollout undo deployment/n3nai`
     - `exit 1`로 워크플로우 실패 표시

### 5.5 필요 GitHub Secrets

| 시크릿 이름       | 내용                                       |
| ----------------- | ------------------------------------------ |
| `KUBECONFIG_D2`   | d2 클러스터 Rancher kubeconfig YAML 전체   |
| `KUBECONFIG_PROD` | prod 클러스터 Rancher kubeconfig YAML 전체 |
| `GITHUB_TOKEN`    | 기본 제공 (GHCR 푸시)                      |

### 5.6 전체 워크플로우 골격

```yaml
name: Build and Deploy to K8s

on:
  push:
    branches: [draft1, main]

env:
  IMAGE_NAME: ghcr.io/n3n-dev/n3nai
  NAMESPACE: homepage-n3n-ai
  APP_NAME: n3nai

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/setup-buildx-action@v3
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          platforms: linux/amd64
          tags: |
            ${{ env.IMAGE_NAME }}:latest
            ${{ env.IMAGE_NAME }}:sha-${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - uses: azure/setup-kubectl@v3
        with:
          version: "v1.28.0"

      - name: Resolve target env
        id: target
        run: |
          if [ "${{ github.ref }}" = "refs/heads/draft1" ]; then
            echo "env=d2" >> "$GITHUB_OUTPUT"
          elif [ "${{ github.ref }}" = "refs/heads/main" ]; then
            echo "env=prod" >> "$GITHUB_OUTPUT"
          fi

      - name: Write kubeconfig (d2)
        if: steps.target.outputs.env == 'd2'
        run: |
          mkdir -p "$RUNNER_TEMP/.kube"
          echo "${{ secrets.KUBECONFIG_D2 }}" > "$RUNNER_TEMP/.kube/config"
          chmod 600 "$RUNNER_TEMP/.kube/config"

      - name: Write kubeconfig (prod)
        if: steps.target.outputs.env == 'prod'
        run: |
          mkdir -p "$RUNNER_TEMP/.kube"
          echo "${{ secrets.KUBECONFIG_PROD }}" > "$RUNNER_TEMP/.kube/config"
          chmod 600 "$RUNNER_TEMP/.kube/config"

      - name: Deploy
        env:
          KUBECONFIG: ${{ runner.temp }}/.kube/config
        run: |
          kubectl apply -f k8s/${{ steps.target.outputs.env }}/combined.yaml
          kubectl -n $NAMESPACE set image \
            deployment/$APP_NAME \
            $APP_NAME=$IMAGE_NAME:sha-${{ github.sha }}
          kubectl -n $NAMESPACE rollout status \
            deployment/$APP_NAME --timeout=120s

      - name: Rollback on failure
        if: failure()
        env:
          KUBECONFIG: ${{ runner.temp }}/.kube/config
        run: |
          kubectl -n $NAMESPACE rollout undo deployment/$APP_NAME || true
          exit 1
```

---

## 6. 부수 정리 항목

| 항목                                               | 작업                                                            |
| -------------------------------------------------- | --------------------------------------------------------------- |
| `dist/`가 git에 커밋되어 있음                      | `.gitignore`에 `dist/` 추가, `git rm -r --cached dist/` 후 커밋 |
| 기존 `.github/workflows/deploy.yml` (GitHub Pages) | 새 워크플로우로 **덮어쓰기**                                    |
| `Dockerfile`                                       | 신규 생성                                                       |
| `package.json`                                     | `start` 스크립트 + `serve` 의존성 추가                          |

---

## 7. 미결정 사항 (사용자 확인 필요)

| #   | 항목                                                               | 결정 시점                                          |
| --- | ------------------------------------------------------------------ | -------------------------------------------------- |
| U1  | prod TLS 인증서 시크릿명 (와일드카드 추정)                         | 매니페스트 작성 직전                               |
| U2  | self-hosted runner의 정확한 라벨 (예: `[self-hosted, n3n-runner]`) | 워크플로우 작성 직전                               |
| U3  | `KUBECONFIG_D2`, `KUBECONFIG_PROD` 시크릿 등록                     | 머지 직전 (사용자가 GitHub Repo Settings에서 등록) |

---

## 8. 보류된 항목 (별도 PR)

본 PR 범위에서 제외하되 추후 추가 권장:

- D1. Readiness/Liveness probe (rolling update 품질 향상)
- D2. `resources.requests/limits` (노드 스케줄링 정밀화)
- D3. Vite `VITE_*` 빌드 환경변수의 d2/prod 분기 (현재는 둘 다 같은 빌드 산출물)
- 추가. `www → apex` 301 redirect (traefik `RedirectRegex` middleware)
- 추가. `index.html`에 `no-cache` 헤더 (해시 없는 엔트리 파일)
- 추가. Slack 알림 등 배포 결과 통보

---

## 9. 트레이드오프 정리

| 결정                          | 채택 이유                                      | 포기한 가치                                        |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| Helm/Kustomize 안 씀          | 사내 표준 일관성, 학습 비용 0                  | 환경 변수 치환·재사용성                            |
| 정적 서버를 `serve`로 통일    | jikji 표준의 외형(`node + npm run start`) 유지 | 더 가벼운 이미지(nginx/caddy 대비 ~30MB 큼)        |
| 단일 `deploy.yml` + `if` 분기 | 파일 1개로 전체 흐름 파악 가능                 | 환경별 워크플로우 독립 진화 어려움                 |
| `:latest` + `:sha-<sha>`      | jikji 컨벤션, 롤백 용이                        | `latest` 태그의 모호성(특정 시점 재현 어려움)      |
| 자동 rollback 추가            | 실패 시 가용성 즉시 복구                       | 실패 사일런트화 위험 → `exit 1`로 명시적 실패 처리 |
| prod manual approval 미적용   | 사용자 선호(속도)                              | 사람 게이트의 안전망 부재                          |
| K8s probe·resources 미적용    | 사내 표준에 부재                               | 운영 안정성 측면의 baseline                        |

---

## 10. 다음 단계

1. 사용자가 본 설계 문서 검토 → 승인 또는 수정 요청
2. 승인 시 `writing-plans` 스킬로 전환 → 구현 플랜 작성
3. 구현 플랜에 따라 작업 진행 (Dockerfile · package.json · k8s/ · workflows · .gitignore · dist 정리)
