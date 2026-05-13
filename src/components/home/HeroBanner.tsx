"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Clock3, MapPin, Phone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isFrench = locale === "fr";

  const services = isFrench
    ? ["Coiffure", "Ongles", "Soins du visage"]
    : ["Hair", "Nails", "Facial care"];

  const promise = isFrench
    ? "Une experience beaute raffinee, pensee pour sublimer chaque detail."
    : "A refined beauty experience designed to elevate every detail.";

  const openingHours = isFrench
    ? "Du mardi au dimanche après-midi de 8h à 19h"
    : "Tuesday to Sunday afternoon, 8am to 7pm";

  const address = isFrench
    ? "Yamoussoukro, Galerie Emy en face de la Pharmacie le Bélier"
    : "Yamoussoukro, Galerie Emy opposite Pharmacie le Belier";

  return (
    <section
      className="relative overflow-hidden bg-[#060606] pt-28 sm:pt-32"
      style={{
        background:
          "radial-gradient(circle at 18% 24%, rgba(232, 197, 108, 0.13) 0%, transparent 20%), radial-gradient(circle at 82% 18%, rgba(176, 122, 40, 0.16) 0%, transparent 24%), linear-gradient(135deg, #050505 0%, #0b0a09 52%, #15110c 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_22%,transparent_78%,rgba(255,255,255,0.03)_100%)]" />
      <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full border border-[#d7b462]/10" />
      <div className="absolute right-[10%] top-20 h-56 w-56 rounded-full border border-[#d7b462]/10" />
      <div className="absolute left-0 right-0 top-[9.5rem] hidden border-t border-[#d7b462]/10 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="py-8 lg:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b462]/20 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#ecd48b] backdrop-blur-sm">
              <Sparkles size={14} />
              <span>{isFrench ? "Maison de beaute" : "Beauty house"}</span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-[#e8c56c]/25 bg-black/40 shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:h-20 sm:w-20">
                <Image
                  src="/aurore-logo.svg"
                  alt="Aurore Luxury Beauty"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#d7b462]/80">AURORE</p>
                <p className="mt-1 text-sm text-[#d9c7a0]">Luxury Beauty</p>
              </div>
            </div>

            <h1
              className="mt-8 max-w-3xl text-5xl font-semibold leading-[0.95] text-transparent sm:text-6xl lg:text-7xl xl:text-[5.8rem]"
              style={{
                fontFamily: "Playfair Display, serif",
                backgroundImage: "linear-gradient(90deg, #b9872f 0%, #f8ec9e 38%, #9f6b1f 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#ddd0b3] sm:text-xl">
              {t("subtitle")}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#a89269] sm:text-lg">
              {promise}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-[#d7b462]/20 bg-white/[0.03] px-4 py-2 text-sm uppercase tracking-[0.18em] text-[#ead18a] backdrop-blur-sm"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={`/${locale}/products`}>
                <Button
                  size="xl"
                  className="group w-full rounded-full border border-[#f0c86b] bg-[linear-gradient(90deg,#b37b26_0%,#f2d678_50%,#a46e1e_100%)] px-9 text-[#1b1106] hover:brightness-105 sm:w-auto"
                >
                  {t("cta")}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href="https://wa.me/22559343866"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#f0c86b]/30 bg-white/[0.02] px-9 py-4 text-lg font-medium text-[#f5de9b] transition-all hover:border-[#f0c86b]/70 hover:bg-white/[0.05] sm:w-auto"
              >
                {isFrench ? "Prendre rendez-vous" : "Book an appointment"}
              </a>
            </div>
          </div>

          <div className="relative lg:py-12">
            <div className="absolute left-10 top-8 h-48 w-48 rounded-full bg-[#c89634]/12 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#d7b462]/16 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_18%,rgba(5,5,5,0.72)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,200,107,0.16),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(240,200,107,0.1),transparent_30%)]" />
              <div className="relative grid gap-4">
                <div className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-[#d7b462]/12 bg-black/35 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d7b462]/80">
                      {isFrench ? "Signature Aurore" : "Aurore Signature"}
                    </p>
                    <p
                      className="mt-3 max-w-xs text-3xl leading-tight text-[#f3e5bd]"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {isFrench ? "Revelez votre eclat avec elegance." : "Reveal your glow with elegance."}
                    </p>
                  </div>
                  <div className="relative hidden h-[4.5rem] w-[4.5rem] overflow-hidden rounded-2xl border border-[#e8c56c]/20 bg-black/50 sm:block sm:h-20 sm:w-20">
                    <Image
                      src="/aurore-logo.svg"
                      alt="Aurore emblem"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.5rem] border border-[#d7b462]/12 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3 text-[#e8c56c]">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7b462]/20 bg-black/35">
                        <Clock3 size={20} />
                      </div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#d7b462]/80">
                        {isFrench ? "Horaires" : "Opening hours"}
                      </p>
                    </div>
                    <p
                      className="mt-4 text-2xl leading-tight text-[#f2dfb0]"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {openingHours}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#d7b462]/12 bg-black/35 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#d7b462]/80">
                      {isFrench ? "Contact direct" : "Direct contact"}
                    </p>
                    <div className="mt-4 space-y-3 text-[#f2dfb0]">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="shrink-0 text-[#e8c56c]" />
                        <span>+225 07 97 878 868</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="shrink-0 text-[#e8c56c]" />
                        <span>+225 07 48 642 713</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[#d7b462]/12 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3 text-[#d8bf82]">
                      <MapPin size={18} className="mt-1 shrink-0 text-[#e8c56c]" />
                      <p className="max-w-sm text-sm leading-6">{address}</p>
                    </div>
                    <div className="text-sm uppercase tracking-[0.22em] text-[#ead18a]">
                      @auroreluxurybeauty
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
