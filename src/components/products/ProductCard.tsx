"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { formatCurrency } from "@/lib/currency";
import { truncate } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations("products");
    const locale = useLocale();
    const { addItem, openCart } = useCartStore();
    const { currency } = useCurrencyStore();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addItem(product);
        toast.success(t("addedToCart"), { icon: "🛍️" });
        setTimeout(() => {
            setIsAdding(false);
            openCart();
        }, 600);
    };

    return (
        <Link href={`/${locale}/products/${product.id}`} className="group block h-full">
            <article className="product-card bg-white border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Discount badge */}
                    {product.discountPercentage > 5 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5">
                            -{Math.round(product.discountPercentage)}%
                        </div>
                    )}

                    {/* Rating badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white text-xs px-1.5 py-0.5">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <span>{product.rating.toFixed(1)}</span>
                    </div>

                    {/* Add to cart overlay */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm p-3">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors ${isAdding
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-900 text-white hover:bg-[#7c3d12]"
                                }`}
                        >
                            <ShoppingBag size={15} />
                            <span>{isAdding ? t("addedToCart") : t("addToCart")}</span>
                        </button>
                    </div>
                </div>

                {/* Product info */}
                <div className="p-3 flex flex-col flex-1">
                    <p className="text-[10px] font-semibold text-[#7c3d12] uppercase tracking-wider mb-0.5">
                        {product.brand}
                    </p>
                    <div className="flex items-start gap-1 mb-2">
                        <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug flex-1">
                            {truncate(product.title, 50)}
                        </h3>
                        <button
                            onClick={handleAddToCart}
                            className={`flex-shrink-0 p-1.5 transition-colors ${
                                isAdding
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-[#7c3d12] hover:text-white"
                            }`}
                            aria-label="Ajouter au panier"
                        >
                            <ShoppingBag size={13} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-bold text-gray-900">
                            {formatCurrency(product.price, currency)}
                        </span>
                        {product.stock <= 5 && product.stock > 0 && (
                            <span className="text-[10px] text-orange-600 font-medium">
                                {product.stock} left
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
