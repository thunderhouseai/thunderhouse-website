"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { AlertCircle, RefreshCw, Unlink, Cpu } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const icons = [AlertCircle, RefreshCw, Unlink, Cpu];

export function Problem() {
  const t = useTranslations("problem");

  const cards = [
    { title: t("card1.title"), body: t("card1.body") },
    { title: t("card2.title"), body: t("card2.body") },
    { title: t("card3.title"), body: t("card3.body") },
    { title: t("card4.title"), body: t("card4.body") },
  ];

  return (
    <section className="py-24 md:py-32 bg-[--color-surface]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            {...fadeUp}
            viewport={{ once: true, margin: "-100px" }}
            whileInView={fadeUp.animate}
            initial={fadeUp.initial}
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

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center">
                      <Icon size={18} className="text-[--color-steel]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[--color-text] mb-2"
                        style={{ fontFamily: "Syne, sans-serif" }}>
                        {card.title}
                      </h3>
                      <p className="text-sm text-[--color-muted] leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
