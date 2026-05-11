"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Camera, MessageCircle, Share2, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-20">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#7c3d12] flex items-center justify-center">
                <span
                  className="text-[#fdf8f3] font-bold text-lg"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  A
                </span>
              </div>
              <span
                className="text-xl font-bold text-[#7c3d12]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Aurore
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-[var(--surface-2)] hover:bg-[#7c3d12] hover:text-[#fdf8f3] text-[var(--text-muted)] transition-all"
              >
                <Camera size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-lg bg-[var(--surface-2)] hover:bg-[#7c3d12] hover:text-[#fdf8f3] text-[var(--text-muted)] transition-all"
              >
                <Share2 size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-lg bg-[var(--surface-2)] hover:bg-[#7c3d12] hover:text-[#fdf8f3] text-[var(--text-muted)] transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h4 className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wide">
              {t("shop")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t("allProducts"), href: `/${locale}/products` },
                { label: t("newArrivals"), href: `/${locale}/products?sort=newest` },
                { label: t("brands"), href: `/${locale}/products?filter=brand` },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--text-muted)] hover:text-[#7c3d12] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h4 className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wide">
              {t("help")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t("faq"), href: "#" },
                { label: t("shipping"), href: "#" },
                { label: t("returns"), href: "#" },
                { label: t("contact"), href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-[var(--text-muted)] hover:text-[#7c3d12] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-semibold text-[var(--text)] mb-4 text-sm uppercase tracking-wide">
              {t("company")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t("about"), href: "#" },
                { label: t("careers"), href: "#" },
                { label: t("press"), href: "#" },
                { label: t("privacy"), href: "#" },
                { label: t("terms"), href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-[var(--text-muted)] hover:text-[#7c3d12] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Aurore Beauty. {t("rights")}
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart size={12} className="text-[#7c3d12] fill-[#7c3d12]" /> by Aurore Team
          </p>
        </div>
      </div>
    </footer>
  );
}
