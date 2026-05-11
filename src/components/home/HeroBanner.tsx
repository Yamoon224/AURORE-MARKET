"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section
      className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0805 0%, #1e0f05 40%, #3d1e0a 70%, #5c2d0e 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #c4651a 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #d4a853 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#d4a853] text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            <span>
              {locale === "fr"
                ? "Collection Printemps 2026"
                : "Spring Collection 2026"}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t("title")}
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <Link href={`/${locale}/products`}>
              <Button size="xl" className="group w-full sm:w-auto">
                {t("cta")}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href={`/${locale}/products?filter=brand`}>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-medium text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all">
                {t("ctaSecondary")}
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8 justify-center md:justify-start">
            {[
              { value: "500+", label: locale === "fr" ? "Marques" : "Brands" },
              { value: "10K+", label: locale === "fr" ? "Produits" : "Products" },
              { value: "98%", label: locale === "fr" ? "Satisfaction" : "Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-2xl font-bold text-[#d4a853]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {value}
                </p>
                <p className="text-xs text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual - product display */}
        <div className="hidden md:block relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Decorative circles */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/5" />

            {/* Main product circle */}
            <div
              className="absolute inset-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(196, 101, 26, 0.3) 0%, rgba(124, 61, 18, 0.5) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="text-center">
                <div
                  className="text-6xl font-bold text-white mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  A
                </div>
                <p className="text-white/60 text-sm">Aurore Beauty</p>
              </div>
            </div>

            {/* Floating product badges */}
            {[
              { top: "5%", left: "0%", text: "Lipstick", sub: "500+ shades" },
              { top: "60%", left: "-5%", text: "Skincare", sub: "Natural" },
              { top: "5%", right: "0%", text: "Eyeshadow", sub: "Premium" },
              { top: "65%", right: "-5%", text: "Foundation", sub: "All skin" },
            ].map((badge, i) => (
              <div
                key={i}
                className="absolute px-3 py-2 rounded-xl text-xs"
                style={{
                  ...badge,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-white font-medium">{badge.text}</p>
                <p className="text-white/50">{badge.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="var(--bg)"
          />
        </svg>
      </div>
    </section>
  );
}
