import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency } from "@/types";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "aurore-currency",
      skipHydration: true,
    }
  )
);
