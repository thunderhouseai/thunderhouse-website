"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { MapPin, Shield, Zap } from "lucide-react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const icons = [MapPin, Shield, Zap];

export function WhyUs() {
  const t = useTranslations("whyus");

  const cols = [
    { title: t("col1.title"), body: t("col1.body") },
    { title: t("col2.title"), body: t("col2.body") },
    { title: t("col3.title"), body: t("col3.body") },
  ];

  return (
    <section className="py-24 md:py-32">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </motion.h2>
        </div>

        {/* Columns */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cols.map((col, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} variants={staggerItem} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[--color-navy] mb-6">
                  <Icon size={22} className="text-[--color-steel]" />
                </div>
                <h3 className="text-xl font-bold text-[--color-text] mb-3"
                  style={{ fontFamily: "Syne, sans-serif" }}>
                  {col.title}
                </h3>
                <p className="text-sm text-[--color-muted] leading-relaxed">{col.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
