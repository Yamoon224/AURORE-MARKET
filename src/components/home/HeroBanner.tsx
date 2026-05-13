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

  const openingHours = isFrench
    ? "Du mardi au dimanche après-midi de 8h à 19h"
    : "Tuesday to Sunday afternoon, 8am to 7pm";

  const address = isFrench
    ? "Yamoussoukro, Galerie Emy en face de la Pharmacie le Bélier"
    : "Yamoussoukro, Galerie Emy opposite Pharmacie le Belier";

  return (
    <section
      className="relative overflow-hidden bg-[#030303] pt-28 sm:pt-32"
      style={{
        background:
          "radial-gradient(circle at 78% 22%, rgba(229, 199, 111, 0.14) 0%, transparent 16%), linear-gradient(135deg, #050505 0%, #0a0908 35%, #14100d 100%)",
      }}
    >
      <div
        className="absolute inset-y-0 right-[-12%] w-[55%] opacity-55 blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(255, 231, 170, 0.36) 0%, rgba(246, 200, 91, 0.2) 10%, transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.95) 100%)",
        }}
      />
      <div className="absolute inset-y-0 left-[31%] hidden w-px bg-gradient-to-b from-transparent via-[#f0c86b] to-transparent opacity-80 md:block" />
      <div className="absolute left-[30.8%] top-[12%] hidden h-[76%] w-[1px] bg-[#f0c86b] shadow-[0_0_26px_rgba(240,200,107,0.85)] md:block" />
      <div className="absolute right-[-8%] bottom-6 h-56 w-[48rem] rounded-full border border-[#f0c86b]/35 opacity-70 blur-[1px]" />
      <div className="absolute right-0 bottom-0 h-52 w-[45rem] opacity-70"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(255,241,168,0.85) 0%, rgba(246,200,91,0.6) 5%, rgba(246,200,91,0.1) 12%, transparent 20%)",
          transform: "rotate(-10deg)",
        }}
      />
      <div
        className="absolute right-[-4%] bottom-8 h-56 w-[46rem] opacity-85"
        style={{
          background:
            "repeating-radial-gradient(circle at 20% 50%, rgba(247,220,133,0.95) 0 2px, rgba(247,220,133,0.0) 2px 15px)",
          WebkitMaskImage:
            "linear-gradient(105deg, transparent 0%, rgba(0,0,0,0.9) 18%, rgba(0,0,0,1) 52%, transparent 85%)",
          maskImage:
            "linear-gradient(105deg, transparent 0%, rgba(0,0,0,0.9) 18%, rgba(0,0,0,1) 52%, transparent 85%)",
          transform: "rotate(-9deg)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1400px] gap-8 px-4 pb-8 sm:px-6 lg:grid-cols-[0.72fr_1.58fr_0.7fr] lg:items-stretch lg:gap-0 lg:pb-10">
        <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#5d431b] bg-[radial-gradient(circle_at_40%_18%,rgba(246,200,91,0.28),transparent_26%),linear-gradient(160deg,#130a04_0%,#090704_56%,#050505_100%)] md:block lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r-[#7d5a23]/55">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.6))]" />
          <div className="absolute left-[-15%] top-[8%] h-[84%] w-[72%] rounded-full bg-[radial-gradient(circle,rgba(183,104,30,0.72)_0%,rgba(98,51,14,0.2)_32%,transparent_70%)] blur-2xl" />
          <div className="absolute left-[20%] top-[7%] h-[92%] w-[58%] rounded-[50%] border border-[#8f6830]/30" />
          <div className="absolute left-[15%] top-[16%] h-[70%] w-[72%] rounded-[48%_52%_42%_58%/40%_36%_64%_60%] bg-[radial-gradient(circle_at_48%_18%,rgba(255,224,153,0.95),rgba(201,123,38,0.95)_18%,rgba(82,39,11,0.88)_42%,rgba(9,7,5,0.96)_70%)] opacity-95 blur-[0.5px]" />
          <div className="absolute left-[43%] top-[18%] h-[50%] w-[24%] rounded-[48%_52%_62%_38%/30%_44%_56%_70%] bg-[radial-gradient(circle_at_55%_25%,rgba(255,231,170,0.98),rgba(184,108,31,0.95)_18%,rgba(58,28,10,0.92)_58%,transparent_75%)] mix-blend-screen opacity-65 blur-[1px]" />
          <div className="absolute bottom-[10%] left-[8%] h-52 w-32 rounded-[45%_55%_60%_40%/40%_48%_52%_60%] border border-[#dcb258]/30 opacity-75" />
          <div className="absolute bottom-[17%] left-[16%] h-40 w-20 rounded-[45%_55%_58%_42%/55%_45%_55%_45%] border border-[#f1d37a]/45 opacity-80" />
        </div>

        <div className="relative flex items-center">
          <div className="w-full py-8 lg:py-10 lg:pl-10 xl:pl-14">
            <div className="mb-5 flex items-center gap-3 text-[#e8c56c]">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#e8c56c]/40 bg-black/40 shadow-[0_0_24px_rgba(232,197,108,0.2)] sm:h-20 sm:w-20">
                <Image
                  src="/aurore-logo.svg"
                  alt="Aurore Luxury Beauty"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden rounded-full border border-[#e8c56c]/30 bg-[#120d08]/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#f3d98c] backdrop-blur-sm sm:inline-flex sm:items-center sm:gap-2">
                <Sparkles size={14} />
                {isFrench ? "Signature luxe" : "Luxury signature"}
              </div>
            </div>

            <div className="relative inline-block">
              <h1
                className="text-[4rem] font-semibold leading-none tracking-[0.06em] text-transparent sm:text-[5.2rem] lg:text-[6.3rem] xl:text-[7.4rem]"
                style={{
                  fontFamily: "Playfair Display, serif",
                  backgroundImage: "linear-gradient(90deg, #b9872f 0%, #f8ec9e 32%, #a87423 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: "0 0 24px rgba(232,197,108,0.08)",
                }}
              >
                AURORE
              </h1>
            </div>

            <p
              className="mt-1 text-4xl italic text-[#ddb04f] sm:text-5xl lg:text-[4.7rem]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Luxury Beauty
            </p>

            <p
              className="mt-5 max-w-4xl text-xl uppercase tracking-[0.04em] text-[#d6b15a] sm:text-2xl lg:text-[1.95rem]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {isFrench
                ? "Revelez votre eclat, sublimez votre beaute"
                : "Reveal your glow, elevate your beauty"}
            </p>

            <div className="mt-8 inline-flex flex-wrap items-center gap-3 border border-[#a67a2f] bg-black/55 px-4 py-3 text-lg text-[#ebc666] shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-6 sm:text-[2.05rem]">
              {services.map((service, index) => (
                <span key={service} className="flex items-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
                  {index > 0 ? <span className="text-[#d6ad4f]">•</span> : null}
                  <span className="uppercase tracking-[0.04em]">{service}</span>
                </span>
              ))}
            </div>

            <p
              className="mt-6 text-2xl italic text-[#d8a846] sm:text-3xl lg:text-[3.2rem]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {isFrench
                ? "Prenez rendez-vous, offrez-vous l'exception"
                : "Book your appointment, indulge in excellence"}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={`/${locale}/products`}>
                <Button
                  size="xl"
                  className="group w-full border border-[#f0c86b] bg-[linear-gradient(90deg,#b37b26_0%,#f2d678_50%,#a46e1e_100%)] text-[#1b1106] hover:brightness-105 sm:w-auto"
                >
                  {t("cta")}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href="https://wa.me/22559343866"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-[#f0c86b]/40 px-8 py-4 text-lg font-medium text-[#f5de9b] transition-all hover:border-[#f0c86b] hover:bg-[#f0c86b]/10 sm:w-auto"
              >
                {isFrench ? "Prendre rendez-vous" : "Book an appointment"}
              </a>
            </div>
          </div>
        </div>

        <div className="relative hidden items-center justify-center lg:flex">
          <div className="w-full max-w-[320px] px-6 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b463] bg-black/45 text-[#e4c56f] shadow-[0_0_28px_rgba(216,180,99,0.18)]">
              <Clock3 size={30} />
            </div>
            <p
              className="mt-5 text-[1.05rem] leading-tight text-[#ff5b1a] xl:text-[1.2rem]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {isFrench ? "Du mardi au dimanche" : "Tuesday to Sunday"}
              <br />
              {isFrench ? "apres midi" : "afternoon"}
            </p>
            <p
              className="mt-3 text-[2.6rem] font-semibold leading-none text-[#ff5b1a] xl:text-[3.4rem]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {isFrench ? "de 8h a 19h" : "8am to 7pm"}
            </p>
            <div className="mt-8 space-y-4 border-t border-[#7a5b24]/45 pt-6 text-left text-[#d6b15a]">
              <div className="flex items-center gap-3 text-[1.05rem] xl:text-[1.2rem]">
                <Phone size={18} className="shrink-0" />
                <span>+225 07 97 878 868</span>
              </div>
              <div className="flex items-center gap-3 text-[1.05rem] xl:text-[1.2rem]">
                <Phone size={18} className="shrink-0" />
                <span>+225 07 48 642 713</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-2 w-full max-w-[1400px] px-4 pb-10 sm:px-6">
        <div className="grid gap-4 border-t border-[#7a5b24]/60 bg-[linear-gradient(180deg,rgba(4,4,4,0.2),rgba(4,4,4,0.72))] px-4 py-4 text-[#ddb95f] backdrop-blur-sm lg:grid-cols-[1.5fr_1fr_0.9fr_0.9fr] lg:items-center">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-1 shrink-0" />
            <p className="text-sm leading-6 text-[#d8bf82] sm:text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
              {address}
            </p>
          </div>
          <div className="text-lg text-[#d8bf82] sm:text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
            @auroreluxurybeauty
          </div>
          <div className="flex items-center gap-3 text-base sm:text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
            <Phone size={18} className="shrink-0" />
            <span>+225 07 97 878 868</span>
          </div>
          <div className="flex items-center gap-3 text-base sm:text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
            <Phone size={18} className="shrink-0" />
            <span>+225 07 48 642 713</span>
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
