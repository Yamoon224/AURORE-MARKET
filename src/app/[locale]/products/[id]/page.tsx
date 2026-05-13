import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/products/AddToCartButton";
import StarRating from "@/components/ui/StarRating";
import type { Product, DummyJsonResponse } from "@/types";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelated(category: string, currentId: number): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=7`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: DummyJsonResponse = await res.json();
    return data.products.filter((p) => p.id !== currentId).slice(0, 6);
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const related = await getRelated(product.category, product.id);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href={`/${locale}`} className="hover:text-[var(--color-primary)] transition-colors">
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-[var(--color-primary)] transition-colors">
              {locale === "fr" ? "Produits" : "Products"}
            </Link>
            <span>/</span>
            <span className="text-[var(--text)] line-clamp-1">{product.title}</span>
          </nav>

          {/* Product detail */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden bg-[var(--surface-2)] border border-[var(--border)]">
                <Image
                  src={product.images[0] || product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {product.discountPercentage > 5 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square relative overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
                      <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" sizes="100px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">
                {product.brand}
              </p>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3 leading-snug"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-[var(--text-muted)]">
                  ({product.rating.toFixed(1)}) · {product.stock} {locale === "fr" ? "en stock" : "in stock"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <p className="text-3xl font-bold text-[var(--text)]">
                  ${product.price.toFixed(2)}
                </p>
                {product.discountPercentage > 5 && (
                  <p className="text-lg text-[var(--text-muted)] line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-[var(--text-muted)] leading-relaxed mb-6 text-sm">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border border-[var(--border)] text-[var(--text-muted)] font-medium capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Add to cart */}
              <AddToCartButton product={product} />

              {/* Product meta */}
              <div className="mt-8 pt-6 border-t border-[var(--border)] space-y-2">
                {[
                  { label: locale === "fr" ? "Catégorie" : "Category", value: product.category.replace(/-/g, " ") },
                  { label: locale === "fr" ? "Disponibilité" : "Availability", value: product.availabilityStatus },
                  { label: "SKU", value: product.sku },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-2 text-sm">
                    <span className="text-[var(--text-muted)] w-28 flex-shrink-0">{label}</span>
                    <span className="text-[var(--text)] capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2
                className="text-2xl font-bold text-[var(--text)] mb-6"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {locale === "fr" ? "Produits similaires" : "Related Products"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/${locale}/products/${p.id}`}>
                    <div className="border border-[var(--border)] hover:border-[var(--color-primary)] transition-all group bg-[var(--surface)]">
                      <div className="aspect-square relative bg-[var(--surface-2)] overflow-hidden">
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="150px"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-[var(--text)] line-clamp-2">{p.title}</p>
                        <p className="text-xs font-bold text-[var(--text)] mt-1">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

