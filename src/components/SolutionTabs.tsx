import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import type { Translations, Lang } from "../i18n/translations";

interface Props {
  tr: Translations;
  lang: Lang;
  /** Section background. "cream" matches Draft 17 (default); "white" for Draft 14/15/16. */
  bg?: "cream" | "white";
  /** Override the section headline. `\n` renders as a linebreak. */
  h2Override?: string;
  /** Card content variant. "draft20" rewrites the first two INNOWATCH cards
   * with the cleaner draft 20 copy; "default" keeps the verbatim source. */
  variant?: "default" | "draft20";
}

const ease = [0.16, 1, 0.3, 1] as const;

type ProductKey = "innowatch" | "wizeye";

interface FeatureCard {
  /** Uppercase eyebrow label (matches the tab on n3n.co.kr product pages). */
  eyebrow: string;
  heading: { ko: string; en: string };
  body: { ko: string; en: string };
  /** Optional secondary heading + body, used by Live Video on Map / Data Integration. */
  heading2?: { ko: string; en: string };
  body2?: { ko: string; en: string };
  /** Optional bullet list of key features (used by WIZEYE cards). */
  bullets?: { ko: string[]; en: string[] };
  /** YouTube embed URL. When empty the card renders a styled placeholder. */
  videoUrl?: string;
}

interface ProductTab {
  key: ProductKey;
  label: string;
  cards: FeatureCard[];
}

// === INNOWATCH, 6 cards from n3n.co.kr/innowatch ===
const INNOWATCH_CARDS: FeatureCard[] = [
  {
    eyebrow: "DISPLAY WALL OPERATION",
    heading: {
      ko: "직관적인 디스플레이 월 운영",
      en: "Intuitive display wall operation",
    },
    body: {
      ko: "INNOWATCH의 멀티 디스플레이 기능을 사용하면 하나의 큰 디스플레이 월 화면을 만들 수 있습니다. 디스플레이 월 컨트롤 UI를 사용하면 한 화면을 여러 개의 셀로 나누어 한 화면에서 관리가 가능합니다.",
      en: "INNOWATCH's multi-display capability composes a single large display-wall canvas. The display-wall control UI splits a screen into multiple cells, letting you manage them all from one place.",
    },
    videoUrl: "https://www.youtube.com/embed/IZNQ8B8XMUE",
  },
  {
    eyebrow: "LIVE VIDEO ON MAP",
    heading: {
      ko: "MAP 상의 모든 카메라 실시간 재생",
      en: "Every camera on the map, always live",
    },
    body: {
      ko: "보안 목적의 그물망 시스템 모니터링에서 맵상에 모든 비디오가 항상 플레이(라이브쇼 맵)되도록 하는 것은 매우 중요합니다.",
      en: "For security-grade mesh monitoring, keeping every video on the map continuously playing (live-show map) is essential.",
    },
    heading2: {
      ko: "효율적인 데이터 전송을 통한 MAP·영상·데이터 통합",
      en: "Unifying map, video and data through efficient transport",
    },
    body2: {
      ko: "1000개가 넘는 비디오를 한 화면에 통합하는 것은 일반 기술로는 어렵지만, INNOWATCH는 N3N의 독보적인 POD 기술을 적용해 방대한 라이브 스트리밍 데이터도 끊김없이 빠르게 재생하고 쉽게 관리할 수 있습니다.",
      en: "Integrating 1000+ video streams into one canvas is hard with conventional stacks. INNOWATCH applies N3N's proprietary POD technology to play and manage massive live streams without interruption.",
    },
    videoUrl: "https://www.youtube.com/embed/x_pCjbHK4z4",
  },
  {
    eyebrow: "DATA INTEGRATION",
    heading: {
      ko: "유연한 맵·비디오 데이터 통합",
      en: "Flexible map and video data integration",
    },
    body: {
      ko: "INNOWATCH SDK 툴을 사용하면 데이터의 종류에 상관없이 통합 및 디스플레이가 가능하며, 유연성과 개방성을 제공합니다.",
      en: "The INNOWATCH SDK ingests and displays data of any type, delivering flexibility and openness.",
    },
    heading2: {
      ko: "i-Editor를 통한 맞춤형 디스플레이",
      en: "Custom layouts via i-Editor",
    },
    body2: {
      ko: "i-Editor는 스크린 레이아웃 에디팅 툴로, GIS 맵·블루프린트·카메라·데이터·알람 시나리오를 통합해 운영자의 니즈를 충족시키는 콘텐츠를 생성하도록 합니다.",
      en: "i-Editor is a screen-layout editor that combines GIS maps, blueprints, cameras, data and alarm scenarios into content tailored to each operator.",
    },
    videoUrl: "https://www.youtube.com/embed/p02UBGaGxOo",
  },
  {
    eyebrow: "SCALABILITY",
    heading: { ko: "확장성", en: "Scalability" },
    body: {
      ko: "INNOWATCH는 통합 모니터링을 가능케 함으로써 관제실의 화면 수를 줄여 비용을 절감할 수 있습니다. 또한 비디오·데이터 콘텐츠를 자유롭게 추가/수정할 수 있어 시스템 증설 없이도 확장이 가능합니다.",
      en: "INNOWATCH consolidates monitoring so control rooms need fewer screens, cutting cost. Video and data content can be freely added or modified, so the system scales without new hardware build-outs.",
    },
    videoUrl: "https://www.youtube.com/embed/RHepozieXzM",
  },
  {
    eyebrow: "DATA PROCESSING",
    heading: {
      ko: "지능형 데이터 프로세싱",
      en: "Intelligent data processing",
    },
    body: {
      ko: "INNOWATCH는 목적에 따른 맞춤형 모니터링을 위해 N3N 고유의 IDP(Intelligent Data Processing) 기술을 사용해, 맞춤형 UI와 통합된 데이터·맵·비디오를 하나의 화면에 제공함으로써 고부가가치 사용자 경험을 제공합니다.",
      en: "INNOWATCH applies N3N's proprietary IDP (Intelligent Data Processing) to deliver purpose-built monitoring, a custom UI alongside unified data, maps and video on a single screen for a high-value operator experience.",
    },
    videoUrl: "https://www.youtube.com/embed/VfuLzDLTfdA",
  },
  {
    eyebrow: "REMOTE DELIVERY",
    heading: {
      ko: "RDS, Remote Desktop System",
      en: "RDS, Remote Desktop System",
    },
    body: {
      ko: "RDS 기술은 IoT 시대에 운영 모니터링과 관리를 위해 필수적인 강력한 시스템입니다. RDS는 원격 서버와 PC의 실시간 모니터링뿐만 아니라, 가장 빠르고 완벽한 방법으로 모니터링 기기들을 제어합니다.",
      en: "RDS is the backbone any IoT-era operations team needs. Beyond real-time monitoring of remote servers and PCs, it controls monitoring devices the fastest, most reliable way available.",
    },
    videoUrl: "https://www.youtube.com/embed/NgLc3Ctb7NU",
  },
];

// === WIZEYE, 5 cards from n3n.co.kr/wizeye ===
const WIZEYE_CARDS: FeatureCard[] = [
  {
    eyebrow: "DATA VISUALIZATION",
    heading: { ko: "데이터 시각화", en: "Data visualization" },
    body: {
      ko: "사용자가 줌(ZOOM) / 팬(PAN) 기능을 통해 직관적으로 문제를 파악할 수 있도록, 수집된 데이터의 상호 연관성을 화면상에 실시간으로 쉽고 입체적으로 보여줍니다.",
      en: "Surface correlations across collected data and present them on a single canvas in real time, with intuitive zoom and pan so operators can spot issues at a glance.",
    },
    bullets: {
      ko: [
        "Multi Dimensional Topology Composition",
        "Single View Pane with Zoom & Pan Control",
        "Insight Designer",
        "Smart Filter",
      ],
      en: [
        "Multi Dimensional Topology Composition",
        "Single View Pane with Zoom & Pan Control",
        "Insight Designer",
        "Smart Filter",
      ],
    },
    videoUrl: "https://www.youtube.com/embed/rYuRBgaEx8I",
  },
  {
    eyebrow: "REAL TIME MONITORING",
    heading: { ko: "실시간 모니터링", en: "Real-time monitoring" },
    body: {
      ko: "실시간 모니터링과 자동 변화 감지, 토폴로지 업데이트를 통해 끊김없는 지속 모니터링이 가능합니다.",
      en: "Continuous monitoring through real-time observation, automatic change detection and topology updates.",
    },
    bullets: {
      ko: [
        "DP – Real time Data collection & Correlation rule engine",
        "DTG – Dynamic Topology Generator",
      ],
      en: [
        "DP – Real-time data collection & correlation rule engine",
        "DTG – Dynamic Topology Generator",
      ],
    },
    videoUrl: "https://www.youtube.com/embed/eALO3-3OXsg",
  },
  {
    eyebrow: "SMART ALARM ROLLUP",
    heading: { ko: "간편하고 스마트한 알람", en: "Simple, smart alarms" },
    body: {
      ko: "다양한 위험 요소를 비즈니스 진행 수준에 맞게 정확히 알람으로 표시합니다. 비즈니스 성격이 다르고 전문 분야가 아니더라도 각 업무 영역간의 상황을 명확히 이해함으로써 시간 및 자원을 절약하고 MTTD(Mean Time To Detect), MTTR(Mean Time To Resolve)을 줄일 수 있습니다.",
      en: "Surface risks as alarms calibrated to the actual business state. Even non-specialists grasp cross-domain situations clearly, saving time and resources, and reducing MTTD (Mean Time To Detect) and MTTR (Mean Time To Resolve).",
    },
    bullets: {
      ko: [
        "Clutter Free Smart Alarm Roll up",
        "Single View Pane for Efficient & Clear Communication",
      ],
      en: [
        "Clutter-free smart alarm rollup",
        "Single view pane for efficient, clear communication",
      ],
    },
    videoUrl: "https://www.youtube.com/embed/rYuRBgaEx8I",
  },
  {
    eyebrow: "STATUS VISUALIZATION",
    heading: {
      ko: "시각화를 통한 실시간 현황 확인 및 공유",
      en: "Real-time status, seen and shared",
    },
    body: {
      ko: "다양한 성과지표(KPI)를 기준으로 실시간으로 연관 데이터를 수집해 IT 자원 구성 요소별 정량적 연관성을 규명합니다. 상태 표시 알람은 교통신호와 같아서 이상 징후 발생 시 기술적 이해 없이도 누구나 확인하고 이해할 수 있습니다.",
      en: "Collect related data in real time against KPIs to quantify how every IT-resource component relates. Status alarms work like traffic lights, anyone can read what's happening without deep technical knowledge.",
    },
    bullets: {
      ko: [
        "DP – Real time Data collection",
        "DTG – Dynamic Topology Generator",
        "Animated Health Status Beacon",
        "Correlation rule engine",
      ],
      en: [
        "DP – Real-time data collection",
        "DTG – Dynamic Topology Generator",
        "Animated health status beacon",
        "Correlation rule engine",
      ],
    },
    videoUrl: "https://www.youtube.com/embed/N_XoTBYmYSE",
  },
  {
    eyebrow: "MULTIMEDIA REPORTING",
    heading: { ko: "멀티미디어 리포트", en: "Multimedia reporting" },
    body: {
      ko: "비상 상황에서 리포트 작성 때문에 \"골든 타임\"을 놓친 적 있으십니까? WIZEYE 뷰어는 스크린을 자유롭게 분할하고 실시간으로 데이터와 모니터링 뷰를 저장/공유할 수 있습니다. 알람 표시를 따라가 보면 근본 원인을 찾고 바로 의사 결정을 할 수 있습니다. 중요한 결정을 위한 '골든 타임'을 다시는 놓치지 마십시오.",
      en: 'Ever missed the "golden time" because you were busy writing a report? WIZEYE Viewer lets you split the screen freely and save/share data and monitoring views in real time. Following the alarm trail leads you to root cause and decision in one motion, so you never lose the moment that matters.',
    },
    bullets: {
      ko: [
        "Real time Multi Monitoring View Sharing",
        "Task Assigning Notes & Comments Sharing",
      ],
      en: [
        "Real-time multi-monitoring view sharing",
        "Task assigning, notes & comment sharing",
      ],
    },
    videoUrl: "https://www.youtube.com/embed/gB6GOVBuA_8",
  },
];

function VideoFrame({ url, label }: { url?: string; label: string }) {
  if (url) {
    return (
      <iframe
        title={label}
        src={url}
        className="absolute inset-0 h-full w-full"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0B0B0B]/[0.05]">
      <PlayCircle size={36} className="text-[#0B0B0B]/30" strokeWidth={1.25} />
      <span
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#0B0B0B",
          opacity: 0.4,
        }}
      >
        Video Placeholder
      </span>
    </div>
  );
}

export default function SolutionTabs({
  lang,
  bg = "cream",
  h2Override,
  variant = "default",
}: Props) {
  const sectionBg = bg === "white" ? "#FFFFFF" : "#F4F2EC";

  const [activeKey, setActiveKey] = useState<ProductKey>("innowatch");
  const [activeIdx, setActiveIdx] = useState(0);

  // Switching product tabs MUST reset the card index. Doing this inside the
  // event handler (instead of a useEffect on [activeKey]) avoids the
  // render → effect → setState → re-render cascade and matches React 19
  // event-driven state guidance.
  const selectProduct = (key: ProductKey) => {
    if (key === activeKey) return;
    setActiveKey(key);
    setActiveIdx(0);
  };

  const innowatchCards: FeatureCard[] =
    variant === "draft20"
      ? INNOWATCH_CARDS.map((card, i) => {
          if (i === 0) {
            return {
              ...card,
              heading: {
                ko: "통합 디스플레이 관제",
                en: "Unified display control",
              },
              body: {
                ko: "여러 화면과 운영 데이터를 하나의 UI로 통합하여 직관적인 실시간 관제 환경을 제공합니다.",
                en: "Multiple screens and operational data are unified into a single UI for an intuitive real-time control environment.",
              },
            };
          }
          if (i === 1) {
            return {
              ...card,
              heading: {
                ko: "실시간 맵 기반 영상 모니터링",
                en: "Real-time map-based video monitoring",
              },
              body: {
                ko: "맵 위에서 모든 카메라 영상을 실시간으로 확인하고 운영 상황을 직관적으로 파악할 수 있습니다.",
                en: "View every camera feed live on the map and grasp operational status at a glance.",
              },
              heading2: {
                ko: "대규모 영상 데이터 처리",
                en: "Large-scale video data processing",
              },
              body2: {
                ko: "수많은 라이브 영상을 하나의 화면에서 안정적으로 처리하여 실시간 모니터링과 통합 운영을 지원합니다.",
                en: "Stably processes countless live streams on a single canvas, enabling real-time monitoring and unified operations.",
              },
            };
          }
          if (i === 2) {
            return {
              ...card,
              heading: {
                ko: "유연한 맵·영상 데이터 통합",
                en: "Flexible map and video data integration",
              },
              body: {
                ko: "다양한 형태의 데이터를 하나의 화면에서 통합 관리하여 높은 운영 효율과 유연성을 제공합니다.",
                en: "Unify diverse data types on a single canvas for greater operational efficiency and flexibility.",
              },
              bullets: undefined,
              heading2: {
                ko: "맞춤형 운영 UI 구성",
                en: "Custom operations UI",
              },
              body2: {
                ko: "운영 목적에 맞춰 맵·영상·데이터·알람 시나리오를 자유롭게 구성할 수 있습니다.",
                en: "Compose map, video, data and alarm scenarios freely to fit operational goals.",
              },
            };
          }
          if (i === 3) {
            return {
              ...card,
              heading: {
                ko: "유연한 시스템 확장",
                en: "Flexible system scaling",
              },
              body: {
                ko: "통합 모니터링 환경을 기반으로 화면 구성과 데이터 콘텐츠를 유연하게 확장할 수 있습니다.",
                en: "Built on a unified monitoring foundation, extend screens and data content flexibly.",
              },
              heading2: {
                ko: "효율적인 운영 환경 구성",
                en: "Efficient operating environment",
              },
              body2: {
                ko: "관제 화면 수를 줄이고 운영 효율을 높여 시스템 증설 없이도 안정적인 운영이 가능합니다.",
                en: "Fewer control screens, higher operating efficiency, stable operations without new build-outs.",
              },
            };
          }
          if (i === 4) {
            return {
              ...card,
              heading: {
                ko: "AI 기반 데이터 통합 분석",
                en: "AI-driven data integration & analysis",
              },
              body: {
                ko: "영상·맵·운영 데이터를 통합 분석하여 목적에 최적화된 운영 환경을 제공합니다.",
                en: "Integrate and analyze video, map and operational data, delivering an environment tuned to purpose.",
              },
              heading2: {
                ko: "맞춤형 운영 모니터링",
                en: "Tailored operations monitoring",
              },
              body2: {
                ko: "운영 목적에 맞춰 필요한 데이터와 UI를 구성하여 효율적인 실시간 관제를 지원합니다.",
                en: "Compose the data and UI you need per use case, supporting efficient real-time control.",
              },
            };
          }
          if (i === 5) {
            return {
              ...card,
              heading: {
                ko: "원격 운영 및 제어 시스템",
                en: "Remote operations & control system",
              },
              body: {
                ko: "원격 서버와 운영 장비를 실시간으로 모니터링하고 안정적으로 제어할 수 있습니다.",
                en: "Monitor remote servers and operational equipment in real time, and control them reliably.",
              },
              heading2: {
                ko: "통합 원격 운영 환경",
                en: "Unified remote operations environment",
              },
              body2: {
                ko: "분산된 운영 시스템을 하나의 환경에서 관리하여 효율적인 모니터링과 운영을 지원합니다.",
                en: "Manage distributed operational systems from a single environment, supporting efficient monitoring and operations.",
              },
            };
          }
          return card;
        })
      : INNOWATCH_CARDS;

  const wizeyeCards: FeatureCard[] =
    variant === "draft20"
      ? WIZEYE_CARDS.map((card, i) => {
          if (i === 0) {
            return {
              ...card,
              heading: {
                ko: "실시간 데이터 시각화",
                en: "Real-time data visualization",
              },
              body: {
                ko: "다양한 운영 데이터를 하나의 화면에서 연결하여 변화와 이상 상황을 직관적으로 파악할 수 있습니다.",
                en: "Connect diverse operational data on a single canvas, spot changes and anomalies at a glance.",
              },
              heading2: { ko: "주요 기능", en: "Key features" },
              body2: undefined,
              bullets: {
                ko: [
                  "Multi-dimensional Topology",
                  "Zoom & Pan Navigation",
                  "Insight-driven Analytics",
                  "Smart Filtering",
                ],
                en: [
                  "Multi-dimensional Topology",
                  "Zoom & Pan Navigation",
                  "Insight-driven Analytics",
                  "Smart Filtering",
                ],
              },
            };
          }
          if (i === 1) {
            return {
              ...card,
              heading: {
                ko: "실시간 운영 모니터링",
                en: "Real-time operations monitoring",
              },
              body: {
                ko: "실시간 데이터 수집과 변화 감지를 기반으로 운영 상태를 지속적으로 모니터링할 수 있습니다.",
                en: "Continuously monitor operational status with real-time data collection and change detection.",
              },
              heading2: { ko: "주요 기능", en: "Key features" },
              body2: undefined,
              bullets: {
                ko: [
                  "Real-time Data Correlation",
                  "Dynamic Topology Mapping",
                  "Continuous Monitoring",
                  "Automated Change Detection",
                ],
                en: [
                  "Real-time Data Correlation",
                  "Dynamic Topology Mapping",
                  "Continuous Monitoring",
                  "Automated Change Detection",
                ],
              },
            };
          }
          if (i === 2) {
            return {
              ...card,
              heading: { ko: "스마트 이벤트 알림", en: "Smart event alerts" },
              body: {
                ko: "다양한 운영 이벤트를 우선순위 기반으로 분석하여 중요한 상황을 빠르게 인지하고 대응할 수 있습니다.",
                en: "Analyze operational events by priority, recognize and respond to what matters most.",
              },
              heading2: { ko: "주요 기능", en: "Key features" },
              body2: undefined,
              bullets: {
                ko: [
                  "Clutter-free Smart Alarm",
                  "Priority-based Event Detection",
                  "Unified Situation View",
                  "Efficient Response Workflow",
                ],
                en: [
                  "Clutter-free Smart Alarm",
                  "Priority-based Event Detection",
                  "Unified Situation View",
                  "Efficient Response Workflow",
                ],
              },
            };
          }
          if (i === 3) {
            return {
              ...card,
              heading: {
                ko: "실시간 운영 상태 시각화",
                en: "Real-time operational status visualization",
              },
              body: {
                ko: "KPI 기반 데이터를 실시간으로 연결하여 운영 상태와 이상 징후를 직관적으로 파악할 수 있습니다.",
                en: "Connect KPI-based data in real time, read operational status and anomalies at a glance.",
              },
              heading2: { ko: "주요 기능", en: "Key features" },
              body2: undefined,
              bullets: {
                ko: [
                  "Real-time Data Correlation",
                  "Dynamic Topology Mapping",
                  "Health Status Visualization",
                  "Automated Event Detection",
                ],
                en: [
                  "Real-time Data Correlation",
                  "Dynamic Topology Mapping",
                  "Health Status Visualization",
                  "Automated Event Detection",
                ],
              },
            };
          }
          if (i === 4) {
            return {
              ...card,
              heading: {
                ko: "실시간 협업 리포트",
                en: "Real-time collaborative reporting",
              },
              body: {
                ko: "운영 화면과 데이터를 실시간으로 공유하여 빠르고 효율적인 상황 대응을 지원합니다.",
                en: "Share operational views and data in real time, supporting fast, efficient response.",
              },
              heading2: { ko: "주요 기능", en: "Key features" },
              body2: undefined,
              bullets: {
                ko: [
                  "Real-time Monitoring Sharing",
                  "Collaborative Report Capture",
                  "Task & Comment Sharing",
                  "Rapid Decision Workflow",
                ],
                en: [
                  "Real-time Monitoring Sharing",
                  "Collaborative Report Capture",
                  "Task & Comment Sharing",
                  "Rapid Decision Workflow",
                ],
              },
            };
          }
          return card;
        })
      : WIZEYE_CARDS;

  const products: ProductTab[] = [
    { key: "innowatch", label: "INNOWATCH", cards: innowatchCards },
    { key: "wizeye", label: "WIZEYE", cards: wizeyeCards },
  ];

  const product = products.find((p) => p.key === activeKey) ?? products[0];
  const lastIdx = product.cards.length - 1;

  // Pagination arrows just step the active card left/right within the row.
  const goPrev = () => setActiveIdx((i) => (i > 0 ? i - 1 : i));
  const goNext = () => setActiveIdx((i) => (i < lastIdx ? i + 1 : i));

  return (
    <section className="relative w-full" style={{ background: sectionBg }}>
      {/* faint grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,11,11,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,11,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 pt-24 md:pt-32 pb-12 md:pb-[72px]">
        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            className="font-grotesk font-semibold tracking-tight text-[#0B0B0B] break-keep text-center whitespace-pre-line md:whitespace-nowrap"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {h2Override ??
              (lang === "ko"
                ? "실시간 데이터 통합과\nAI 분석을 통한 의사결정 혁신"
                : "Real-time data integration\nand AI-driven decision innovation")}
          </h2>

          {/* Stats cards, Industries-style bordered grid with plus markers. */}
          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-0 max-w-4xl mx-auto border-t border-r border-gray-200">
            {(lang === "ko"
              ? [
                  { num: "10억+", label: "일일 분석 프레임" },
                  { num: "2가지", label: "핵심 AI 플랫폼" },
                  { num: "1개", label: "통합 인텔리전스" },
                  { num: "실시간", label: "운영 가시성" },
                ]
              : [
                  { num: "1B+", label: "Frames analyzed daily" },
                  { num: "2", label: "AI platforms" },
                  { num: "1", label: "Unified intelligence" },
                  { num: "Real-time", label: "Operational visibility" },
                ]
            ).map((s) => (
              <div
                key={s.label}
                className="group relative flex flex-col items-center justify-center text-center px-4 py-6 md:px-5 md:py-8 border-b border-gray-200 hover:bg-[radial-gradient(50%_85%_at_50%_0%,rgba(196,215,128,0.10),transparent)] transition-all duration-300"
              >
                <Plus
                  className="pointer-events-none absolute top-0 left-0 z-10 size-6 text-gray-300 -translate-x-1/2 -translate-y-1/2"
                  strokeWidth={1}
                />
                <Plus
                  className="pointer-events-none absolute top-0 right-0 z-10 size-6 text-gray-300 translate-x-1/2 -translate-y-1/2"
                  strokeWidth={1}
                />
                <Plus
                  className="pointer-events-none absolute bottom-0 left-0 z-10 size-6 text-gray-300 -translate-x-1/2 translate-y-1/2"
                  strokeWidth={1}
                />
                <Plus
                  className="pointer-events-none absolute bottom-0 right-0 z-10 size-6 text-gray-300 translate-x-1/2 translate-y-1/2"
                  strokeWidth={1}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-px border-l border-gray-200" />

                <div
                  className="font-grotesk font-bold"
                  style={{
                    fontSize: "clamp(22px, 2.6vw, 32px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "#46805A",
                  }}
                >
                  {s.num}
                </div>
                <div className="mt-2 text-[12px] md:text-[13px] text-[#3a3a3a] break-keep">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* === PRODUCT TABS === */}
        <div
          role="tablist"
          aria-label="Products"
          className="scrollbar-hide mt-14 md:mt-16 flex items-stretch md:items-center gap-2 md:gap-3 border-b border-[#0B0B0B]/10 overflow-x-auto overflow-y-hidden"
        >
          {products.map((p) => {
            const isActive = p.key === activeKey;
            return (
              <button
                key={p.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectProduct(p.key)}
                className="relative flex-1 md:flex-none text-center px-4 md:px-6 py-3 md:py-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "#0B0B0B" : "#0B0B0B66",
                }}
              >
                {p.label}
                {isActive && (
                  <motion.span
                    layoutId="solution-tab-underline"
                    className="absolute left-0 right-0 -bottom-px h-[2px]"
                    style={{ background: "#0B0B0B" }}
                    transition={{ duration: 0.4, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* === CARDS, all 6 in one flex row, active grows, inactive narrows ===
      On mobile the parent is block (not flex) so motion's flexBasis:0 /
      flexGrow inline styles are ignored and the active card sizes from
      its content. Inactive cards are hidden on mobile. */}
        <div className="mt-12 md:mt-14 block md:flex md:flex-row md:gap-3 md:items-stretch">
          {product.cards.map((c, i) => {
            const active = i === activeIdx;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.article
                key={`${activeKey}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  // 12:1 grow ratio, collapsed cards stay narrow so the
                  // active card gets most of the row width and its content
                  // can lay out more horizontally (reducing card height).
                  flexGrow: active ? 12 : 1,
                  flexBasis: 0,
                  boxShadow: active
                    ? "0 24px 60px -20px rgba(11,11,11,0.18), 0 8px 20px -8px rgba(0,0,0,0.06)"
                    : "0 1px 0 rgba(0,0,0,0.02)",
                  borderColor: active ? "rgba(11,11,11,0.18)" : "#E6E2D8",
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                tabIndex={0}
                aria-expanded={active}
                className={`relative rounded-[20px] border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden flex-col ${
                  variant === "draft20"
                    ? activeKey === "innowatch"
                      ? "h-[420px] md:h-[460px]"
                      : "h-[460px] md:h-[540px]"
                    : "h-auto md:h-[560px]"
                } ${active ? "flex" : "hidden md:flex"}`}
                transition={{ duration: 0.55, ease }}
                style={{
                  background: "#FFFFFF",
                }}
              >
                {/* Header, only rendered when active. Uses the inactive numeral's
          type style (22px / cream) so the title sits quietly above the
          video. The inactive card has no top header, its tilted
          numeral fills the body instead. */}
                {active && (
                  <div className="px-5 md:px-7 pt-4 md:pt-7">
                    <h3
                      className="font-grotesk font-semibold text-[#0B0B0B] break-keep text-[17px] md:text-[22px]"
                      style={{
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.heading[lang]}
                    </h3>
                  </div>
                )}

                {/* === ACTIVE BODY: video + heading + body === */}
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="active-body"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="flex flex-col flex-1 gap-3 md:gap-4 px-5 md:px-7 pt-3 md:pt-5 pb-2 md:pb-2 overflow-hidden"
                    >
                      {/* Video, 16:9 capped by max-height so it doesn't grow
             disproportionately as the active card widens. */}
                      <div
                        className="relative w-full rounded-[12px] overflow-hidden bg-[#F4F2EC] mx-auto"
                        style={{
                          aspectRatio: "16 / 9",
                          maxHeight: variant === "draft20" ? 200 : 240,
                          maxWidth:
                            variant === "draft20"
                              ? `${(200 * 16) / 9}px`
                              : `${(240 * 16) / 9}px`,
                        }}
                      >
                        <VideoFrame url={c.videoUrl} label={c.eyebrow} />
                      </div>

                      {/* Body, heading has been promoted to the card's top header.
             Outer motion.div already clips, so inner wrapper can
             stay overflow-visible to let the divider extend to
             the card edges via negative horizontal margins. */}
                      <div className="flex flex-col gap-2 min-h-0">
                        <p className="text-[13px] md:text-[16px] leading-[1.6] text-[#3a3a3a] break-keep">
                          {c.body[lang]}
                        </p>
                        {variant === "draft20" && (c.heading2 || c.bullets) && (
                          <div className="my-2 md:my-3 h-px bg-[#0B0B0B]/15 -mx-5 md:-mx-7" />
                        )}
                        {c.heading2 && (
                          <h4
                            className={`font-grotesk font-semibold text-[#0B0B0B] break-keep text-[14px] md:text-[16px] ${
                              variant !== "draft20" ? "mt-1" : ""
                            }`}
                            style={{ lineHeight: 1.35 }}
                          >
                            {c.heading2[lang]}
                          </h4>
                        )}
                        {c.bullets && (
                          <ul className="space-y-1 list-disc list-outside pl-5 marker:text-[#3a3a3a]/60 text-[13px] md:text-[16px] leading-[1.55] text-[#3a3a3a]">
                            {c.bullets[lang].map((b, bi) => (
                              <li key={bi} className="break-keep">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        {c.body2 && (
                          <p className="text-[13px] md:text-[16px] leading-[1.6] text-[#3a3a3a] break-keep">
                            {c.body2[lang]}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* === INACTIVE: numeral + card name on a single tilted line ===
          Absolutely positioned so its placement is tied to the card
          frame, not the active body's flex layout, the label stays
          fixed at the top when neighbouring cards become active. */}
                <AnimatePresence initial={false}>
                  {!active && (
                    <motion.div
                      key="inactive-vertical"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="absolute inset-x-0 top-0 bottom-0 flex items-start justify-center px-2 pt-7 pointer-events-none"
                    >
                      <span
                        className="whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          fontFamily: '"Inter", system-ui, sans-serif',
                          fontSize: 22,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          color: "#E5E2D6",
                        }}
                      >
                        {num}. {c.eyebrow}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* === PAGINATION, steps the active card left/right === */}
        <div className="mt-6 md:mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIdx === 0}
            aria-label="Previous card"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0B0B0B]/8 text-[#0B0B0B]/35 hover:text-[#0B0B0B]/80 hover:border-[#0B0B0B]/25 transition disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={14} />
          </button>

          <div className="flex items-center gap-1.5">
            {product.cards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Show card ${idx + 1}`}
                aria-current={idx === activeIdx}
                className="transition-all"
                style={{
                  width: idx === activeIdx ? 18 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: idx === activeIdx ? "#0B0B0B99" : "#0B0B0B1A",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIdx === lastIdx}
            aria-label="Next card"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0B0B0B]/8 text-[#0B0B0B]/35 hover:text-[#0B0B0B]/80 hover:border-[#0B0B0B]/25 transition disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
