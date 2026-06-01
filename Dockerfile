FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# K8s(ingress 루트 서빙)용 빌드는 base=/ 로 오버라이드.
# GH Pages 빌드는 VITE_BASE 미설정 시 vite.config 기본값(/n3nai/) 사용
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
