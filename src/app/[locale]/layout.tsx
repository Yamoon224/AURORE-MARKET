import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "Aurore Beauty | Premium Cosmetics",
  description:
    "Discover premium cosmetics, skincare and beauty products. Shop the best brands worldwide.",
  keywords: "beauty, cosmetics, skincare, makeup, fragrance",
  openGraph: {
    title: "Aurore Beauty",
    description: "Premium cosmetics for everyone",
    type: "website",
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StoreProvider>
        <ThemeProvider locale={locale}>
          {children}
          <CartDrawer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </ThemeProvider>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
