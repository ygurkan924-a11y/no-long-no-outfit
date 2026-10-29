"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Currency = "TRY" | "USD" | "EUR";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInTRY: number) => string;
  rates: Record<Currency, number>;
};

const STORAGE_KEY = "nlno-currency";

// Yaklaşık kurlar (TRY bazlı)
const RATES: Record<Currency, number> = {
  TRY: 1,
  USD: 0.029, // 1 TRY ~ 0.029 USD
  EUR: 0.027, // 1 TRY ~ 0.027 EUR
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("TRY");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
      if (saved && (saved === "TRY" || saved === "USD" || saved === "EUR")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrencyState(saved);
      }
    } catch {
      // sessizce geç
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // sessizce geç
    }
  }, []);

  const formatPrice = useCallback(
    (amountInTRY: number) => {
      const rate = RATES[currency];
      const converted = Math.round(amountInTRY * rate);

      if (currency === "TRY") {
        return `${amountInTRY.toLocaleString("tr-TR")} TL`;
      } else if (currency === "USD") {
        return `$${converted.toLocaleString("en-US")}`;
      } else {
        return `€${converted.toLocaleString("de-DE")}`;
      }
    },
    [currency]
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      rates: RATES,
    }),
    [currency, setCurrency, formatPrice]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency, CurrencyProvider içinde kullanılmalıdır.");
  }
  return context;
}

