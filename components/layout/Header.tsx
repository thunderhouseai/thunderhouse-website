"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

const CALENDLY = "https://calendly.com/thunderhouseai/30min";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/process`, label: t("nav.process") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <span className="hidden sm:block">
              <Image
                src="/images/logo.svg"
                alt="ThunderHouse"
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </span>
            <span className="sm:hidden">
              <Image
                src="/images/logo-mark.svg"
                alt="ThunderHouse"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[--color-muted] hover:text-[--color-text] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button href={CALENDLY} variant="primary" newTab>
              {t("nav.cta")}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-[--color-muted] hover:text-[--color-text] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[--color-surface] border-t border-[--color-border]"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[--color-muted] hover:text-[--color-text] transition-colors text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-[--color-border]">
                <LanguageSwitcher />
                <Button href={CALENDLY} variant="primary" newTab>
                  {t("nav.cta")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
