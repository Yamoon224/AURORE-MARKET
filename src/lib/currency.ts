import type { Currency, CurrencyConfig } from "@/types";

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1, locale: "en-US" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, locale: "fr-FR" },
  XOF: { code: "XOF", symbol: "CFA", rate: 605, locale: "fr-SN" },
};

export function convertPrice(priceUSD: number, currency: Currency): number {
  const config = CURRENCIES[currency];
  return priceUSD * config.rate;
}

export function formatCurrency(priceUSD: number, currency: Currency): string {
  const config = CURRENCIES[currency];
  const converted = convertPrice(priceUSD, currency);

  if (currency === "XOF") {
    return `${Math.round(converted).toLocaleString("fr-FR")} ${config.symbol}`;
  }

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}
