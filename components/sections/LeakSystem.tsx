"use client";

import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const LEAK_COLORS = [
  "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  "from-amber-500/10 to-amber-500/5 border-amber-500/20",
  "from-red-500/10 to-red-500/5 border-red-500/20",
  "from-purple-500/10 to-purple-500/5 border-purple-500/20",
];

const LEAK_ACCENT = [
  "text-blue-400",
  "text-amber-400",
  "text-red-400",
  "text-purple-400",
];

export function LeakSystem() {
  const t = useTranslations("leaks");
  const locale = useLocale();

  const leaks = [
    { key: "leak1", color: LEAK_COLORS[0], accent: LEAK_ACCENT[0] },
    { key: "leak2", color: LEAK_COLORS[1], accent: LEAK_ACCENT[1] },
    { key: "leak3", color: LEAK_COLORS[2], accent: LEAK_ACCENT[2] },
    { key: "leak4", color: LEAK_COLORS[3], accent: LEAK_ACCENT[3] },
  ] as const;

  return (
    <section className="py-24 md:py-32 bg-[--color-surface]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[--color-muted] text-base sm:text-lg leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Leak cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
          {leaks.map(({ key, color, accent }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              className={`relative rounded-2xl border bg-gradient-to-br p-6 ${color}`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`text-4xl font-bold leading-none flex-shrink-0 ${accent} opacity-40`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {t(`${key}.number` as `${typeof key}.number`)}
                </span>
                <div>
                  <h3
                    className={`text-lg font-bold mb-2 ${accent}`}
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {t(`${key}.name` as `${typeof key}.name`)}
                  </h3>
                  <p className="text-sm text-[--color-muted] leading-relaxed">
                    {t(`${key}.body` as `${typeof key}.body`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button href={`/${locale}/ai-intake-audit`} variant="primary">
            {t("cta")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
