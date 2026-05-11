"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product, ProductFilters, SortOption } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  initialSearch?: string;
  initialCategory?: string;
}

const BRANDS_TO_SHOW = 10;

export default function ProductGrid({
  products,
  initialSearch = "",
  initialCategory = "",
}: ProductGridProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: initialSearch,
  });
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>(initialCategory);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  // Extract unique brands and categories
  const brands = useMemo(
    () =>
      [...new Set(products.map((p) => p.brand).filter(Boolean))].sort().slice(0, BRANDS_TO_SHOW * 3),
    [products]
  );

  const productTypes = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort(),
    [products]
  );

  // Filter and sort products
  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    const q = (filters.searchQuery || "").toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Type/category filter
    if (selectedType) {
      result = result.filter((p) => p.category === selectedType);
    }

    // Sort
    switch (sortBy) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [products, filters, selectedBrand, selectedType, sortBy]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedType("");
    setFilters({ searchQuery: "" });
  };

  const hasActiveFilters = selectedBrand || selectedType;

  return (
    <div>
      {/* Filter & sort bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
              showFilters
                ? "bg-[#7c3d12] text-[#fdf8f3] border-[#7c3d12]"
                : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:border-[#7c3d12]"
            )}
          >
            <SlidersHorizontal size={16} />
            {t("products.filter")}
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-[#c4651a] text-white text-xs flex items-center justify-center">
                {[selectedBrand, selectedType].filter(Boolean).length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors"
            >
              <X size={14} />
              {t("products.filters.clearAll")}
            </button>
          )}

          <p className="text-sm text-[var(--text-muted)]">
            {filtered.length}{" "}
            {filtered.length > 1
              ? t("cart.items")
              : t("cart.item")}
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative flex items-center gap-2">
          <ArrowUpDown size={16} className="text-[var(--text-muted)]" />
          <span className="text-sm text-[var(--text-muted)]">{t("products.sort")}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="pl-3 pr-8 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] cursor-pointer focus:outline-none focus:border-[#7c3d12] appearance-none"
          >
            <option value="featured">{t("products.sortOptions.featured")}</option>
            <option value="priceAsc">{t("products.sortOptions.priceAsc")}</option>
            <option value="priceDesc">{t("products.sortOptions.priceDesc")}</option>
            <option value="rating">{t("products.sortOptions.rating")}</option>
            <option value="newest">{t("products.sortOptions.newest")}</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        {showFilters && (
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5 sticky top-24 space-y-6">
              {/* Brand filter */}
              <div>
                <h4 className="font-semibold text-sm text-[var(--text)] mb-3">
                  {t("products.filters.brand")}
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedBrand("")}
                    className={cn(
                      "w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                      !selectedBrand
                        ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                    )}
                  >
                    {t("products.filters.all")}
                  </button>
                  {brands.slice(0, BRANDS_TO_SHOW).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand === selectedBrand ? "" : brand)}
                      className={cn(
                        "w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors capitalize",
                        selectedBrand === brand
                          ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product type filter */}
              <div>
                <h4 className="font-semibold text-sm text-[var(--text)] mb-3">
                  {t("products.filters.category")}
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedType("")}
                    className={cn(
                      "w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                      !selectedType
                        ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                    )}
                  >
                    {t("products.filters.all")}
                  </button>
                  {productTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type === selectedType ? "" : type)}
                      className={cn(
                        "w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors capitalize",
                        selectedType === type
                          ? "bg-[#faeedd] text-[#7c3d12] font-medium"
                          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                      )}
                    >
                      {type.replace(/-/g, " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setShowFilters(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-[var(--bg)] rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[var(--text)]">{t("products.filter")}</h3>
                <button onClick={() => setShowFilters(false)} className="text-[var(--text-muted)]">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-[var(--text)]">
                    {t("products.filters.brand")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedBrand("")}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-full border transition-all",
                        !selectedBrand
                          ? "bg-[#7c3d12] text-[#fdf8f3] border-[#7c3d12]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      )}
                    >
                      {t("products.filters.all")}
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand === selectedBrand ? "" : brand)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-full border transition-all capitalize",
                          selectedBrand === brand
                            ? "bg-[#7c3d12] text-[#fdf8f3] border-[#7c3d12]"
                            : "border-[var(--border)] text-[var(--text-muted)]"
                        )}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-[var(--text)]">
                    {t("products.filters.category")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedType("")}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-full border transition-all",
                        !selectedType
                          ? "bg-[#7c3d12] text-[#fdf8f3] border-[#7c3d12]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      )}
                    >
                      {t("products.filters.all")}
                    </button>
                    {productTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type === selectedType ? "" : type)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-full border transition-all capitalize",
                          selectedType === type
                            ? "bg-[#7c3d12] text-[#fdf8f3] border-[#7c3d12]"
                            : "border-[var(--border)] text-[var(--text-muted)]"
                        )}
                      >
                        {type.replace(/-/g, " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-6 py-3 bg-[#7c3d12] text-[#fdf8f3] rounded-xl font-medium"
              >
                {t("products.filters.apply")}
              </button>
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-muted)] text-lg">{t("products.noProducts")}</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#7c3d12] font-medium hover:underline"
              >
                {t("products.filters.clearAll")}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-8 py-3 rounded-xl border-2 border-[#7c3d12] text-[#7c3d12] font-medium hover:bg-[#7c3d12] hover:text-[#fdf8f3] transition-all"
                  >
                    {locale === "fr" ? "Voir plus" : "Load more"}
                    <span className="ml-2 text-sm opacity-70">
                      ({filtered.length - paginated.length}{" "}
                      {locale === "fr" ? "restants" : "remaining"})
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
