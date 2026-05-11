"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { formatCurrency } from "@/lib/currency";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const t = useTranslations();
  const locale = useLocale();
  const drawerRef = useRef<HTMLDivElement>(null);

  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();
  const { currency } = useCurrencyStore();

  const subtotal = getSubtotal();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col bg-[var(--bg)] shadow-2xl transition-transform duration-350 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#7c3d12]" />
            <h2
              className="text-lg font-bold text-[var(--text)]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("cart.title")}
            </h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-[#7c3d12] text-[#fdf8f3] font-medium">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors text-[var(--text-muted)]"
            aria-label={t("common.close")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--surface-2)] flex items-center justify-center">
                <ShoppingBag size={36} className="text-[var(--text-muted)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text)] mb-1">
                  {t("cart.empty")}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {t("cart.emptyDesc")}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 text-sm font-medium text-[#7c3d12] hover:text-[#5c2d0e] underline-offset-2 hover:underline"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 px-6 py-5"
                >
                  {/* Product image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#7c3d12] font-medium uppercase tracking-wide mb-0.5">
                      {item.product.brand}
                    </p>
                    <p className="text-sm font-medium text-[var(--text)] line-clamp-2 leading-tight">
                      {item.product.title}
                    </p>
                    <p className="text-sm font-bold text-[#7c3d12] mt-1">
                      {formatCurrency(
                        item.product.price * item.quantity,
                        currency
                      )}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 border border-[var(--border)] rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-[var(--surface-2)] transition-colors rounded-l-lg text-[var(--text)]"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-[var(--text)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-[var(--surface-2)] transition-colors rounded-r-lg text-[var(--text)]"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                        aria-label={t("cart.remove")}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with checkout */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border)] px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{t("cart.subtotal")}</span>
                <span className="font-medium text-[var(--text)]">
                  {formatCurrency(subtotal, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{t("cart.shipping")}</span>
                <span className="font-medium text-emerald-600">{t("cart.free")}</span>
              </div>
              <div className="border-t border-[var(--border)] pt-2 flex items-center justify-between">
                <span className="font-semibold text-[var(--text)]">{t("cart.total")}</span>
                <span className="text-xl font-bold text-[#7c3d12]">
                  {formatCurrency(subtotal, currency)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <Link href={`/${locale}/checkout`} onClick={closeCart}>
              <Button fullWidth size="lg" className="group">
                {t("cart.checkout")}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[var(--text-muted)] hover:text-[#7c3d12] transition-colors py-1"
            >
              {t("cart.continueShopping")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
