"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/stores/currencyStore";
import { useThemeStore } from "@/stores/themeStore";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCurrencyStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
