"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    toast.success("Ajouté au panier · Added to cart", { icon: "🛍️" });
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl text-lg font-bold transition-all duration-300 ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] active:scale-95"
      }`}
    >
      <ShoppingBag size={22} />
      {added
        ? "✓ Ajouté au panier"
        : "Ajouter au panier · Add to Cart"}
    </button>
  );
}
