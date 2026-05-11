import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
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

interface ProductsPageProps {
    searchParams: Promise<{ search?: string; category?: string; brand?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const products = await getProducts();

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Page header */}
                    <div className="mb-8">
                        <h1
                            className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-2"
                            style={{ fontFamily: "Playfair Display, serif" }}
                        >
                            Nos Produits · Our Products
                        </h1>
                        <p className="text-[var(--text-muted)]">
                            {products.length} produits disponibles
                        </p>
                    </div>

                    <Suspense
                        fallback={
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-2xl skeleton"
                                    />
                                ))}
                            </div>
                        }
                    >
                        <ProductGrid products={products} initialSearch={params.search} initialCategory={params.category} />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </>
    );
}
