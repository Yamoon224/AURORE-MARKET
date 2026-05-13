import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import type { Product, DummyJsonResponse } from "@/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://dummyjson.com/products?limit=100",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: DummyJsonResponse = await res.json();
    return data.products;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const newArrivals = [...products]
    .sort((a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime())
    .slice(0, 10);

  // Collect unique brands
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].slice(0, 8);

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategorySection />

        <Suspense fallback={<div className="py-20 text-center text-[var(--text-muted)]">Chargement...</div>}>
          <FeaturedProducts products={featured} />
        </Suspense>

        {/* Brand strip */}
        <section className="py-10 border-y border-[var(--border)] overflow-hidden bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-8 justify-center flex-wrap">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <FeaturedProducts
            products={newArrivals}
            title={undefined}
            titleKey="newArrivals"
          />
        </Suspense>

        {/* Promo banner */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto overflow-hidden relative text-center py-16 px-6"
            style={{
              background: "linear-gradient(135deg, #090909 0%, #17120a 45%, #b88a2d 100%)",
            }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Livraison Gratuite · Free Shipping
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Sur toutes vos commandes · On all your orders
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[#17120a] font-bold text-lg">
              ✦ Commandez maintenant · Shop Now
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
