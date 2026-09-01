import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Shield,
  Factory,
  Zap,
  Server,
  Truck,
  ArrowRight,
  Plus,
} from "lucide-react";
import type { Translations } from "../i18n/translations";

interface Props {
  tr: Translations;
  /** Per-item list of next-step bullets. Rendered as a "Next steps"
   * section at the bottom of each card when provided. */
  nextSteps?: string[][];
  nextStepsLabel?: string;
  /** Eyebrow / h2 / subhead override, lets Draft 0.5 reuse Draft 7's
   * "N3N 도입에 따른 운영 혁신" framing. */
  eyebrowOverride?: string;
  h2Override?: string;
  /** Optional desktop-only override for the headline. Falls back to h2Override. */
  h2DesktopOverride?: string;
  subOverride?: string;
  /** Optional desktop-only override for the subhead. Falls back to subOverride. */
  subDesktopOverride?: string;
  /** Per-item title/desc override. Each entry overrides the matching
   * translation item by index, partial overrides are allowed. */
  itemsOverride?: Array<{ title?: string; desc?: string } | undefined>;
  /** Light-theme palette (Draft 7 uses a bright background for this
   * section). Default keeps the existing dark card treatment. */
  light?: boolean;
}

const icons = [Building2, Shield, Factory, Zap, Server, Truck];

export default function Industries({
  tr,
  nextSteps,
  nextStepsLabel,
  eyebrowOverride,
  h2Override,
  h2DesktopOverride,
  subOverride,
  subDesktopOverride,
  itemsOverride,
  light = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const sectionClass = light
    ? "relative py-24 bg-white overflow-hidden"
    : "relative py-24 bg-[#060E1A] overflow-hidden";
  const gridColor = light ? "rgba(17,24,39,0.06)" : "rgba(0,102,255,0.3)";
  // Monotone palette for the light variant (neutral grays, no blue accent)
  const eyebrowClass = light ? "text-gray-500" : "text-blue-400";
  const h2Class = light ? "text-gray-900" : "text-white";
  const subClass = light ? "text-gray-500" : "text-gray-400";
  // Plus-cornered architectural frame (lifted from the shadcn CallToAction
  // reference). Light cards lose the rounded/ring treatment and instead
  // use border-y + plus markers at the corners + subtle radial highlight.
  // Hover wash for the light variant, soft yellowish-green to echo
  // Hero 17's sage/yellow/white palette instead of a neutral gray.
  // Each card draws only its bottom border so the row-divider line never
  // doubles with the next row's top border. The grid container draws the
  // missing top edge.
  const cardClass = light
    ? "group relative flex flex-col px-5 py-6 md:p-7 min-h-[320px] border-b border-gray-200 bg-white hover:bg-[radial-gradient(50%_85%_at_25%_0%,rgba(196,215,128,0.10),transparent)] transition-all duration-300"
    : "group relative flex flex-col p-6 rounded-2xl border border-gray-800/60 bg-gray-900/40 backdrop-blur-sm hover:border-blue-500/40 hover:bg-gray-900/60 transition-all duration-300";
  // Icon tile + glyph use a sage green that harmonizes with the
  // yellowish-green hover wash on the card.
  const iconTileClass = light
    ? "w-11 h-11 rounded-xl bg-white ring-1 ring-gray-200 flex items-center justify-center mb-3 group-hover:bg-[#F4F7E8] group-hover:ring-[#C8DC82]/40 transition-colors"
    : "w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors";
  const iconClass = light ? "text-[#6AA87B]" : "text-blue-400";
  const titleClass = light ? "text-gray-900" : "text-white";
  const descClass = light ? "text-gray-500" : "text-gray-400";
  const nextBorder = light ? "border-gray-200" : "border-gray-800/80";
  const nextLabelClass = light ? "text-gray-400" : "text-gray-500";
  const nextItemClass = light ? "text-gray-700" : "text-gray-300";

  return (
    <section ref={ref} className={sectionClass}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {(() => {
            const eyebrowText = eyebrowOverride ?? tr.industries.eyebrow;
            return eyebrowText ? (
              <span
                className={`text-sm font-semibold tracking-[0.2em] uppercase ${eyebrowClass}`}
              >
                {eyebrowText}
              </span>
            ) : null;
          })()}
          <h2
            className={`md:hidden font-grotesk font-semibold mb-5 whitespace-pre-line break-keep ${h2Class}`}
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {h2Override ?? tr.industries.h2}
          </h2>
          <h2
            className={`hidden md:block font-grotesk font-semibold mb-5 whitespace-pre-line break-keep ${h2Class}`}
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {h2DesktopOverride ?? h2Override ?? tr.industries.h2}
          </h2>
          <p
            className={`md:hidden text-[14px] max-w-3xl mx-auto leading-[1.6] whitespace-pre-line break-keep ${subClass}`}
          >
            {subOverride ?? tr.industries.sub}
          </p>
          <p
            className={`hidden md:block text-[16px] max-w-3xl mx-auto leading-[1.6] whitespace-pre-line break-keep ${subClass}`}
          >
            {subDesktopOverride ?? subOverride ?? tr.industries.sub}
          </p>
        </motion.div>

        {/* Grid, 3 columns on desktop, 2 on tablet, 1 on mobile.
      Wrapper draws the top + right edges; cards draw their own bottom
      and (via the absolute `border-l` div) left, so every internal
      divider is a single 1px line, no doubling between rows. */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 ${light ? "border-t border-r border-gray-200" : ""}`}
        >
          {tr.industries.items.map((rawItem, i) => {
            const override = itemsOverride?.[i];
            const item = {
              title: override?.title ?? rawItem.title,
              desc: override?.desc ?? rawItem.desc,
            };
            const Icon = icons[i];
            const steps = nextSteps?.[i];
            // Index-based corner ownership so each grid intersection draws
            // exactly ONE plus marker (instead of 4 overlapping). Assumes
            // the desktop 3-col layout, each card always owns its top-left
            // corner; only edge/last cards add the missing right/bottom.
            const cols = 3;
            const col = i % cols;
            const isLastCol = col === cols - 1;
            void cols;
            void isLastCol;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={cardClass}
              >
                {light && (
                  <>
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
                  </>
                )}

                {/* Icon */}
                <div className={iconTileClass}>
                  <Icon size={20} className={iconClass} />
                </div>

                {/* Text */}
                <h3 className={`font-semibold text-base mb-2 ${titleClass}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${descClass}`}>
                  {item.desc}
                </p>

                {/* Next steps, bottom-anchored via mt-auto so the section
          aligns at the same y across cards regardless of desc length */}
                {steps && steps.length > 0 && (
                  <div className={`mt-auto pt-4 border-t ${nextBorder}`}>
                    <span
                      className={`text-[10px] font-bold tracking-[0.22em] uppercase block mb-2 ${nextLabelClass}`}
                    >
                      {nextStepsLabel ?? "Next Steps"}
                    </span>
                    <div className="flex flex-col gap-1">
                      {steps.map((step, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <ArrowRight
                            size={12}
                            className={`flex-shrink-0 mt-[3px] ${light ? "text-gray-400" : iconClass}`}
                          />
                          <span
                            className={`text-[13px] font-medium leading-snug break-keep ${nextItemClass}`}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
