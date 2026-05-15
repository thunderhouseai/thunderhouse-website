"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industryLinks = [
    { href: `/${locale}/industries/doctors`, label: t("footer.nav_doctors") },
    { href: `/${locale}/industries/attorneys`, label: t("footer.nav_attorneys") },
    { href: `/${locale}/industries/cpas`, label: t("footer.nav_cpas") },
  ];

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
            <Link
              href={`/${locale}/services`}
              className="text-sm text-[--color-muted] hover:text-[--color-text] transition-colors"
            >
              {t("nav.services")}
            </Link>

            {/* Industries dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-[--color-muted] hover:text-[--color-text] transition-colors">
                {t("nav.industries")}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-[--color-surface] border border-[--color-border] rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="py-2">
                      {industryLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-[--color-muted] hover:text-[--color-text] hover:bg-white/5 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <div className="border-t border-[--color-border] mt-2 pt-2">
                        <Link
                          href={`/${locale}/industries`}
                          className="block px-4 py-2.5 text-sm text-[--color-steel] hover:text-[--color-cta-hover] transition-colors font-medium"
                        >
                          {t("nav.industries")} →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
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
            <Button href={`/${locale}/ai-intake-audit`} variant="primary">
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
              <Link
                href={`/${locale}/services`}
                className="text-[--color-muted] hover:text-[--color-text] transition-colors text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.services")}
              </Link>
              {/* Industries section in mobile */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-2">
                  {t("nav.industries")}
                </p>
                <div className="flex flex-col gap-2 pl-2">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[--color-muted] hover:text-[--color-text] transition-colors text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              {navLinks.slice(1).map((link) => (
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
                <Button href={`/${locale}/ai-intake-audit`} variant="primary">
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
