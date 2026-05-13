"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const serviceLinks = [
    { href: `/${locale}/services/build`, label: t("services.build.name") },
    { href: `/${locale}/services/analyze`, label: t("services.analyze.name") },
    { href: `/${locale}/services/transform`, label: t("services.transform.name") },
  ];

  const companyLinks = [
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/process`, label: t("nav.process") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <footer className="bg-[--color-surface] border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.svg"
              alt="ThunderHouse"
              width={160}
              height={42}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-[--color-muted] leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[--color-muted] mb-4">
              {t("footer.services")}
            </p>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[--color-muted] hover:text-[--color-text] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[--color-muted] mb-4">
              {t("footer.company")}
            </p>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[--color-muted] hover:text-[--color-text] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Language */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[--color-muted] mb-4">
              {t("nav.contact")}
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://linkedin.com/company/thunderhouseai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--color-muted] hover:text-[--color-steel] transition-colors"
                aria-label={t("footer.linkedin")}
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href="https://instagram.com/thunderhouseai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--color-muted] hover:text-[--color-steel] transition-colors"
                aria-label={t("footer.instagram")}
              >
                <InstagramIcon size={20} />
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[--color-border-subtle]">
          <p className="text-xs text-[--color-muted]">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
