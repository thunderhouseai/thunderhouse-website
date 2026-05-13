"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Hammer, BarChart3, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const CALENDLY = "https://calendly.com/thunderhouseai/30min";

type PillarKey = "build" | "analyze" | "transform";
type PillarTransKey = `${PillarKey}.${"name" | "tagline" | "cta"}`;

export function Services() {
  const t = useTranslations("services");
  const locale = useLocale();

  const pillars = [
    {
      key: "build",
      icon: Hammer,
      services: [t("build.s1"), t("build.s2"), t("build.s3")],
      href: `/${locale}/services/build`,
    },
    {
      key: "analyze",
      icon: BarChart3,
      services: [t("analyze.s1"), t("analyze.s2"), t("analyze.s3")],
      href: `/${locale}/services/analyze`,
    },
    {
      key: "transform",
      icon: Sparkles,
      services: [t("transform.s1"), t("transform.s2"), t("transform.s3"), t("transform.s4")],
      href: `/${locale}/services/transform`,
    },
  ] as const;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </motion.h2>
        </div>

        {/* Pillar cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {pillars.map(({ key, icon: Icon, services, href }) => (
            <motion.div key={key} variants={staggerItem} className="h-full">
              <Card pillar className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[--color-steel]" />
                  </div>
                  <h3 className="text-xl font-bold text-[--color-steel]"
                    style={{ fontFamily: "Syne, sans-serif" }}>
                    {t(`${key}.name` as PillarTransKey)}
                  </h3>
                </div>
                <p className="text-sm text-[--color-muted] mb-5">
                  {t(`${key}.tagline` as PillarTransKey)}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[--color-text]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[--color-steel] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="text-sm font-semibold text-[--color-steel] hover:text-[--color-cta-hover] transition-colors"
                >
                  {t(`${key}.cta` as PillarTransKey)}
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[--color-muted]"
        >
          {t("not_sure")}{" "}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--color-steel] hover:text-[--color-cta-hover] underline underline-offset-2 transition-colors"
          >
            {t("not_sure")}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
