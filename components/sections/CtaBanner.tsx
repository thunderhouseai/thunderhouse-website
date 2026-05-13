"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";

const CALENDLY = "https://calendly.com/thunderhouseai/30min";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 md:py-32 bg-[--color-navy]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--color-text] mb-8"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
        >
          {t("headline")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Button href={CALENDLY} variant="primary" newTab>
            {t("button")}
          </Button>
        </motion.div>

        <motion.p
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-sm text-[--color-muted] max-w-md mx-auto"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
