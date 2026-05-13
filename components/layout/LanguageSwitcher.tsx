"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const other = locale === "en" ? "es" : "en";
  const otherLabel = locale === "en" ? "ES" : "EN";
  const currentLabel = locale === "en" ? "EN" : "ES";

  const handleSwitch = () => {
    const newPath = pathname.replace(`/${locale}`, `/${other}`);
    if (typeof window !== "undefined") {
      localStorage.setItem("thunderhouse-lang", other);
    }
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="relative flex items-center gap-1 text-sm font-semibold text-[--color-muted] hover:text-[--color-text] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
      aria-label={`Switch to ${other === "en" ? "English" : "Spanish"}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentLabel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="text-[--color-steel]"
        >
          {currentLabel}
        </motion.span>
      </AnimatePresence>
      <span className="text-[--color-border]">/</span>
      <span>{otherLabel}</span>
    </button>
  );
}
