"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Stethoscope, Scale, Calculator } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

type IndustryKey = "doctors" | "attorneys" | "cpas";

const icons: Record<IndustryKey, React.ElementType> = {
  doctors: Stethoscope,
  attorneys: Scale,
  cpas: Calculator,
};

export function Industries() {
  const t = useTranslations("industries");
  const locale = useLocale();

  const industries: IndustryKey[] = ["doctors", "attorneys", "cpas"];

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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[--color-muted] text-sm leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Industry cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {industries.map((key) => {
            const Icon = icons[key];
            const services = [
              t(`${key}.s1` as `${typeof key}.s1`),
              t(`${key}.s2` as `${typeof key}.s2`),
              t(`${key}.s3` as `${typeof key}.s3`),
              t(`${key}.s4` as `${typeof key}.s4`),
            ];

            return (
              <motion.div key={key} variants={staggerItem} className="h-full">
                <Card pillar className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[--color-steel]" />
                    </div>
                    <h3
                      className="text-lg font-bold text-[--color-text]"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {t(`${key}.name` as `${typeof key}.name`)}
                    </h3>
                  </div>
                  <p className="text-sm text-[--color-muted] mb-5">
                    {t(`${key}.tagline` as `${typeof key}.tagline`)}
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
                    href={`/${locale}/industries/${t(`${key}.slug` as `${typeof key}.slug`)}`}
                    className="text-sm font-semibold text-[--color-steel] hover:text-[--color-cta-hover] transition-colors"
                  >
                    {t(`${key}.cta` as `${typeof key}.cta`)}
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
