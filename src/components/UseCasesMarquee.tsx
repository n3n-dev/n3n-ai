import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Translations } from "../i18n/translations";

interface Props {
  tr: Translations;
  eyebrowOverride?: string;
  h2Override?: string;
  subOverride?: string;
  /** Force the light-theme section background (white) regardless of the
   * app-wide dark/light class. Draft 7 / Draft 0.5 use this. */
  lightBg?: boolean;
}

// Unified sage-green badge, matches the rest of the design system
// (#F2F6E2 wash, #46805A accent). All categories share one quiet pill so
// the row reads as a single tonal family.
const SAGE_BADGE =
  "bg-[#F2F6E2] text-[#46805A]/85 dark:bg-[#46805A]/20 dark:text-[#87C599]/85";

const CATEGORIES = [
  "물류",
  "도시 운영",
  "데이터센터",
  "생산공정",
  "서비스 운영",
  "스마트시티",
  "IT 인프라",
  "산업현장",
  "공공인프라",
  "Logistics",
  "Urban Ops",
  "Data Centers",
  "Production",
  "Service Ops",
  "Smart City",
  "IT Infra",
  "Industrial",
  "Public Infra",
] as const;

const badgeColors: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c, SAGE_BADGE]),
);

function Card({
  item,
  cta,
  lightBg,
}: {
  item: {
    client: string;
    category: string;
    desc: string;
    image: string;
    url: string;
  };
  cta: string;
  lightBg?: boolean;
}) {
  // Layout: outer article is a flex-column with comfortable left padding.
  const cardBase = lightBg
    ? "group relative flex-shrink-0 flex flex-col w-[240px] md:w-[320px] h-[200px] md:h-[220px] overflow-hidden rounded-xl border border-gray-100/80 bg-white px-6 py-5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 will-change-transform"
    : "group relative flex-shrink-0 flex flex-col w-[240px] md:w-[320px] h-[200px] md:h-[220px] overflow-hidden rounded-xl border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black px-6 py-5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)] hover:-translate-y-0.5 transition-all duration-300 will-change-transform";
  // Category-specific pill background, gives each card a clear,
  // consistent badge color so the hierarchy reads at a glance.
  const fallbackPill = lightBg
    ? "bg-black/5 text-gray-700 group-hover:bg-black/10"
    : "bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 group-hover:bg-black/10 dark:group-hover:bg-white/20";
  const pillBg = badgeColors[item.category] ?? fallbackPill;
  const titleColor = lightBg
    ? "text-gray-900"
    : "text-gray-900 dark:text-gray-100";
  const descColor = lightBg
    ? "text-gray-500"
    : "text-gray-500 dark:text-gray-400";
  const dotPatternBg = lightBg
    ? "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:4px_4px]"
    : "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]";

  return (
    <article className={cardBase}>
      {/* Dotted pattern that surfaces on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 ${dotPatternBg}`} />
      </div>

      {/* Category badge, left-anchored with a small negative inset so the
     pill background's left edge aligns with the card's content edge,
     and the badge text aligns with the title text below it. */}
      <span
        className={`relative -ml-2 self-start text-[11px] font-semibold tracking-[0.04em] px-2 py-1 rounded-md transition-colors duration-300 ${pillBg}`}
      >
        {item.category}
      </span>

      {/* Title, primary node in the hierarchy. */}
      <h3
        className={`relative mt-3 font-semibold tracking-tight text-[15px] ${titleColor}`}
      >
        {item.client}
      </h3>

      {/* Description, secondary, muted. */}
      <p
        className={`relative mt-1.5 text-[13px] leading-[1.55] line-clamp-4 ${descColor}`}
      >
        {item.desc}
      </p>

      {/* CTA, anchored to the bottom of the card (mt-auto) so its position is
       identical across cards regardless of body length. Destination is
       per-card via item.url and opens in a new tab. */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium group-hover:gap-1.5 transition-all self-end ${
          lightBg
            ? "text-gray-700 hover:text-gray-900"
            : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        }`}
      >
        {cta}
        <ArrowRight size={12} />
      </a>
    </article>
  );
}

function MarqueeRow({
  items,
  cta,
  direction = "left",
  duration = 40,
  lightBg,
}: {
  items: {
    client: string;
    category: string;
    desc: string;
    image: string;
    url: string;
  }[];
  cta: string;
  direction?: "left" | "right";
  duration?: number;
  lightBg?: boolean;
}) {
  const doubled = [...items, ...items];
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{ x }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" },
        }}
      >
        {doubled.map((item, i) => (
          <Card
            key={`${item.client}-${i}`}
            item={item}
            cta={cta}
            lightBg={lightBg}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function UseCasesMarquee({
  tr,
  eyebrowOverride,
  h2Override,
  subOverride,
  lightBg,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cases = tr.usecases.cases;

  const mid = Math.ceil(cases.length / 2);
  const row1 = cases.slice(0, mid);
  const row2 = cases.slice(mid);

  return (
    <section
      className={`py-16 md:py-24 lg:py-28 overflow-hidden ${
        lightBg ? "bg-gray-50 text-gray-900" : "bg-gray-50 dark:bg-gray-950"
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6 mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {(() => {
            const eyebrowText = eyebrowOverride ?? tr.usecases.eyebrow;
            return eyebrowText ? (
              <span
                className={`text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 block ${
                  lightBg ? "text-gray-500" : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {eyebrowText}
              </span>
            ) : null;
          })()}
          <h2
            className={`font-grotesk font-semibold mb-2 break-keep whitespace-pre-line md:whitespace-normal ${
              lightBg ? "text-gray-900" : "text-gray-900 dark:text-white"
            }`}
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {h2Override ?? tr.usecases.h2}
          </h2>
          <p
            className={`text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed break-keep whitespace-pre-line ${
              lightBg ? "text-gray-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {subOverride ?? tr.usecases.sub}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow
          items={row1}
          cta={tr.usecases.cta}
          direction="left"
          duration={45}
          lightBg={lightBg}
        />
        {row2.length > 0 && (
          <MarqueeRow
            items={row2}
            cta={tr.usecases.cta}
            direction="right"
            duration={50}
            lightBg={lightBg}
          />
        )}
      </div>
    </section>
  );
}
