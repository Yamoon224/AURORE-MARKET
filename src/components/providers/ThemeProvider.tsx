"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

interface ThemeProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function ThemeProvider({ children, locale }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("lang", locale);
  }, [theme, locale]);

  return <>{children}</>;
}
