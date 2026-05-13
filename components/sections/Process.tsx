"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function Process() {
  const t = useTranslations("process");

  const steps = [
    { num: 1, title: t("step1.title"), body: t("step1.body") },
    { num: 2, title: t("step2.title"), body: t("step2.body") },
    { num: 3, title: t("step3.title"), body: t("step3.body") },
    { num: 4, title: t("step4.title"), body: t("step4.body") },
    { num: 5, title: t("step5.title"), body: t("step5.body") },
  ];

  return (
    <section className="py-24 md:py-32 bg-[--color-surface]">
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

        {/* Timeline — vertical on mobile, horizontal on desktop */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-[--color-border]">
            <motion.div
              className="h-full bg-[--color-steel] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-5 gap-6"
          >
            {steps.map((step) => (
              <motion.div key={step.num} variants={staggerItem} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[--color-navy] border-2 border-[--color-steel] flex items-center justify-center mb-6 relative z-10">
                  <span className="text-lg font-bold text-[--color-steel]"
                    style={{ fontFamily: "Syne, sans-serif" }}>
                    {step.num}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[--color-steel] mb-2 tracking-wider"
                  style={{ fontFamily: "Syne, sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-xs text-[--color-muted] leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Vertical timeline for mobile */}
        <div className="md:hidden flex flex-col gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[--color-navy] border-2 border-[--color-steel] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[--color-steel]">{step.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[--color-border] mt-2" />
                )}
              </div>
              <div className="pt-2 pb-8">
                <h3 className="text-sm font-bold text-[--color-steel] mb-1 tracking-wider"
                  style={{ fontFamily: "Syne, sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[--color-muted] leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
