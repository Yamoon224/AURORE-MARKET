"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const CATEGORIES = [
    { key: "beauty", label: { fr: "Beauté", en: "Beauty" } },
    { key: "fragrances", label: { fr: "Parfums", en: "Fragrances" } },
    { key: "skin-care", label: { fr: "Soins Peau", en: "Skin Care" } },
    { key: "hair-care", label: { fr: "Cheveux", en: "Hair Care" } },
    { key: "mens-watches", label: { fr: "Accessoires", en: "Accessories" } },
    { key: "womens-jewellery", label: { fr: "Bijoux", en: "Jewellery" } },
    { key: "sunglasses", label: { fr: "Lunettes", en: "Sunglasses" } },
    { key: "womens-bags", label: { fr: "Sacs", en: "Bags" } },
];

export default function CategorySection() {
    const t = useTranslations("home");
    const locale = useLocale();
    const [images, setImages] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchCategoryImages = async () => {
            const results: Record<string, string> = {};
            await Promise.all(
                CATEGORIES.map(async (cat) => {
                    try {
                        const res = await fetch(
                            `https://dummyjson.com/products/category/${cat.key}?limit=1&select=thumbnail`,
                            { cache: "force-cache" }
                        );
                        if (res.ok) {
                            const data = await res.json();
                            if (data.products?.[0]?.thumbnail) {
                                results[cat.key] = data.products[0].thumbnail;
                            }
                        }
                    } catch { }
                })
            );
            setImages(results);
        };
        fetchCategoryImages();
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 bg-[var(--surface)]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-[#c4651a] uppercase tracking-widest mb-2">
                        {locale === "fr" ? "Explorer par catégorie" : "Browse by category"}
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-[var(--text)]"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        {t("categories")}
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.key}
                            href={`/${locale}/products?category=${cat.key}`}
                            className="group"
                        >
                            <div className="overflow-hidden border border-[var(--border)] hover:border-[#7c3d12] hover:shadow-lg transition-all duration-300 bg-[var(--surface-2)]">
                                <div className="relative aspect-square bg-gray-100">
                                    {images[cat.key] ? (
                                        <Image
                                            src={images[cat.key]}
                                            alt={cat.label[locale as "fr" | "en"] || cat.label.en}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 animate-pulse" />
                                    )}
                                </div>
                                <div className="p-3 text-center border-t border-[var(--border)]">
                                    <p className="text-sm font-semibold text-[var(--text)]">
                                        {cat.label[locale as "fr" | "en"] || cat.label.en}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
