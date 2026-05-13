"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function SocialProof() {
  const t = useTranslations("proof");

  const clients = [
    t("client1"), t("client2"), t("client3"), t("client4"), t("client5"),
  ];

  const cases = [
    {
      badge: t("case1.badge"),
      industry: t("case1.industry"),
      headline: t("case1.headline"),
      body: t("case1.body"),
    },
    {
      badge: t("case2.badge"),
      industry: t("case2.industry"),
      headline: t("case2.headline"),
      body: t("case2.body"),
    },
    {
      badge: t("case3.badge"),
      industry: t("case3.industry"),
      headline: t("case3.headline"),
      body: t("case3.body"),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[--color-surface]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client logo row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {clients.map((client) => (
            <div
              key={client}
              className="px-6 py-3 rounded-xl border border-[--color-border] text-sm text-[--color-muted] font-medium"
            >
              {/* TODO: Replace with actual client logos */}
              {client}
            </div>
          ))}
        </motion.div>

        {/* Big metric */}
        <div className="text-center mb-20">
          <motion.p
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[--color-text] mb-3"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t("metric")}
          </motion.p>
          <motion.p
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[--color-muted] text-sm"
          >
            {t("metric_sub")}
          </motion.p>
        </div>

        {/* Case studies */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cases.map((c, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Card className="h-full flex flex-col">
                <Badge className="mb-4 self-start">{c.badge}</Badge>
                <p className="text-xs text-[--color-steel] font-semibold tracking-wide mb-3">
                  {c.industry}
                </p>
                <h3 className="font-bold text-[--color-text] mb-3 leading-snug"
                  style={{ fontFamily: "Syne, sans-serif" }}>
                  {c.headline}
                </h3>
                <p className="text-sm text-[--color-muted] leading-relaxed flex-1">{c.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
