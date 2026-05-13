"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname as useFullPathname } from "next/navigation";
import { useRouter, usePathname } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  ShoppingBag,
  Search,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useThemeStore } from "@/stores/themeStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { CURRENCIES } from "@/lib/currency";
import type { Currency } from "@/types";
import { cn } from "@/lib/utils";

const CURRENCIES_LIST: Currency[] = ["USD", "EUR", "XOF"];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = useFullPathname(); // full path with locale prefix (for active nav links)
  const localeFree = usePathname();  // locale-free path (for locale switching)

  const { toggleCart, getTotalItems } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();
  const { currency, setCurrency } = useCurrencyStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalItems = getTotalItems();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click (mousedown + contains for reliability)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/products`, label: t("nav.products") },
  ];

  // localeFree already comes without locale prefix from @/navigation's usePathname
  const localeFreePath = localeFree || "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[var(--surface)] shadow-[var(--shadow-header)] backdrop-blur-sm"
          : "bg-[var(--bg)]"
      )}
    >
      {/* Top bar */}
      <div className="bg-[#7c3d12] text-[#fdf8f3] text-xs py-2 px-4 text-center hidden md:block">
        <span>✨ {locale === "fr" ? "Livraison gratuite pour toute commande • Paiement sécurisé via WhatsApp" : "Free shipping on all orders • Secure payment via WhatsApp"} ✨</span>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#c78d2f]/35 sm:h-14 sm:w-14">
              <Image
                src="/aurore-logo.svg"
                alt="Aurore Luxury Beauty"
                fill
                sizes="(min-width: 640px) 56px, 48px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-2xl font-bold tracking-[0.18em] text-[#7c3d12] group-hover:text-[#5c2d0e] transition-colors"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                AURORE
              </span>
              <span
                className="mt-1 text-xs text-[#b67b27] group-hover:text-[#8f5a16] transition-colors"
                style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic" }}
              >
                Luxury Beauty
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === link.href
                    ? "text-[#7c3d12]"
                    : "text-[var(--text-muted)] hover:text-[#7c3d12]"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[#7c3d12] transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/${locale}/products?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("common.search")}
                    className="w-44 sm:w-60 px-3 py-1.5 text-sm rounded-lg input-themed"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)]"
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)] hover:text-[#7c3d12]"
                  aria-label={t("nav.search")}
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Currency selector */}
            <div className="relative hidden sm:block" ref={currencyRef}>
              <button
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)] hover:text-[#7c3d12]"
              >
                {CURRENCIES[currency].symbol}
                <span className="hidden lg:block">{currency}</span>
                <ChevronDown size={12} />
              </button>
              {isCurrencyOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl border border-[var(--border)] bg-[var(--surface)] z-50 overflow-hidden animate-fade-in">
                  {CURRENCIES_LIST.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                        currency === c
                          ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                          : "hover:bg-[var(--surface-2)] text-[var(--text)]"
                      )}
                    >
                      <span className="font-mono w-10">{CURRENCIES[c].symbol}</span>
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language toggle */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrencyOpen(false);
                }}
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)] hover:text-[#7c3d12]"
              >
                <Globe size={15} />
                <span className="uppercase">{locale}</span>
                <ChevronDown size={12} />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl shadow-xl border border-[var(--border)] bg-[var(--surface)] z-50 overflow-hidden animate-fade-in">
                  {(["en", "fr"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        const path = localeFree && localeFree !== "/" ? localeFree : "";
                        window.location.href = `/${l}${path}`;
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors",
                        locale === l
                          ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                          : "hover:bg-[var(--surface-2)] text-[var(--text)]"
                      )}
                    >
                      <span>{l === "fr" ? "🇫🇷" : "🇺🇸"}</span>
                      <span>{t(`language.${l}`)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)] hover:text-[#7c3d12]"
              aria-label={t("theme.toggle")}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)] hover:text-[#7c3d12]"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag size={22} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#7c3d12] text-[#fdf8f3] text-[10px] font-bold px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text)]"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[#faeedd] text-[#7c3d12]"
                    : "text-[var(--text)] hover:bg-[var(--surface-2)]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile currency & language */}
            <div className="flex items-center gap-3 pt-3 mt-3 border-t border-[var(--border)]">
              <div className="flex-1">
                <p className="text-xs text-[var(--text-muted)] mb-2">{t("currency.label")}</p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full px-3 py-2 text-sm rounded-lg input-themed"
                >
                  {CURRENCIES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--text-muted)] mb-2">Langue</p>
                <div className="flex gap-2">
                  {(["en", "fr"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        const path = localeFree && localeFree !== "/" ? localeFree : "";
                        window.location.href = `/${l}${path}`;
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 text-center py-2 rounded-lg text-sm font-medium transition-colors",
                        locale === l
                          ? "bg-[#7c3d12] text-[#fdf8f3]"
                          : "bg-[var(--surface-2)] text-[var(--text)]"
                      )}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
