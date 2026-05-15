"use client";

import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { BoltIcon } from "@/components/ui/BoltIcon";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { fadeIn, fadeUp } from "@/lib/animations";

const animateWords = (text: string, baseDelay = 0.2) =>
  text.split(" ").map((word, i) => (
    <motion.span
      key={i}
      className="inline-block mr-[0.25em]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: baseDelay + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  ));

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0 }} className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[--color-steel]">
            <BoltIcon size={12} color="var(--color-steel)" className="bolt-hero" />
            {t("eyebrow")}
            <BoltIcon size={12} color="var(--color-steel)" className="bolt-hero" />
          </span>
        </motion.div>

        {/* Headline — two lines */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
        >
          <span className="block">{animateWords(t("headline"), 0.2)}</span>
          <span className="block text-[--color-steel]">
            {animateWords(t("headline_accent"), 0.55)}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[--color-muted] leading-relaxed mb-10"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button href={`/${locale}/ai-intake-audit`} variant="primary">
            {t("cta_primary")}
          </Button>
          <Button href={`/${locale}/process`} variant="secondary">
            {t("cta_secondary")}
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { target: 10, suffix: "+", sub: t("stat1_sub"), label: t("stat1_label") },
            { target: 3, suffix: "", sub: t("stat2_sub"), label: t("stat2_label") },
            { target: 0, suffix: "", sub: t("stat3_sub"), label: t("stat3_label") },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold text-[--color-steel]"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[--color-text] mt-0.5">
                {stat.sub}
              </div>
              <div className="text-xs text-[--color-muted]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
