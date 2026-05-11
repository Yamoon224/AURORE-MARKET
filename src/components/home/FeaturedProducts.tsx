"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  titleKey?: string;
}

export default function FeaturedProducts({
  products,
  title,
  titleKey,
}: FeaturedProductsProps) {
  const t = useTranslations("home");
  const locale = useLocale();

  if (!products.length) return null;

  const heading = title ?? t(titleKey as Parameters<typeof t>[0] ?? "featured");

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm font-semibold text-[#c4651a] uppercase tracking-widest mb-2">
            ✦ Aurore
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[var(--text)]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {heading}
          </h2>
        </div>
        <Link
          href={`/${locale}/products`}
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#7c3d12] hover:text-[#5c2d0e] transition-colors group"
        >
          {t("viewAll")}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {products.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#7c3d12] text-[#7c3d12] font-medium hover:bg-[#7c3d12] hover:text-[#fdf8f3] transition-all"
        >
          {t("viewAll")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
