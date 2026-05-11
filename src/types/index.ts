// Types for DummyJSON products
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  availabilityStatus: string;
  thumbnail: string;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order types
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  total: number;
  currency: Currency;
  createdAt: string;
}

// Currency types
export type Currency = "USD" | "EUR" | "XOF";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // Rate relative to USD
  locale: string;
}

// Theme types
export type Theme = "light" | "dark";

// Filter types
export interface ProductFilters {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  searchQuery?: string;
}

// Sort types
export type SortOption = "featured" | "priceAsc" | "priceDesc" | "rating" | "newest";

// Locale types
export type Locale = "en" | "fr";
