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

/* ---------- Tipler ---------- */

export type CartItem = {
  key: string; // ürün + beden + renk birleşimi
  productId: number;
  name: string;
  price: number;
  size: string;
  colorName: string;
  colorHex: string;
  quantity: number;
};

export type NewCartItem = Omit<CartItem, "key" | "quantity">;

export const LUXURY_PACKAGING_FEE = 79;

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  loaded: boolean;
  isCartOpen: boolean;
  hasLuxuryPackaging: boolean;
  toggleLuxuryPackaging: () => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: NewCartItem) => void;
  increase: (key: string) => void;
  decrease: (key: string) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "nlno-cart";
const MAX_QUANTITY = 10;

const CartContext = createContext<CartContextValue | null>(null);

/* ---------- Sağlayıcı ---------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLuxuryPackaging, setHasLuxuryPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const toggleLuxuryPackaging = useCallback(() => {
    setHasLuxuryPackaging((prev) => !prev);
  }, []);

  // Sayfa açılınca localStorage'dan sepeti oku
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsed);
        }
      }
    } catch {
      // Bozuk veri varsa boş sepetle devam et
    }
    setLoaded(true);
  }, []);

  // Sepet her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Depolama dolu ya da kapalıysa sessizce geç
    }
  }, [items, loaded]);

  // Başka sekmede sepet değişirse senkronize et
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setItems(e.newValue ? JSON.parse(e.newValue) : []);
      } catch {
        // yoksay
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addItem = useCallback((item: NewCartItem) => {
    const key = `${item.productId}-${item.size}-${item.colorName}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i
        );
      }
      return [...prev, { ...item, key, quantity: 1 }];
    });
    // Ürün eklenince sepet çekmecesini otomatik aç
    setIsCartOpen(true);
  }, []);

  const increase = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i))
    );
  }, []);

  const decrease = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      loaded,
      isCartOpen,
      hasLuxuryPackaging,
      toggleLuxuryPackaging,
      giftNote,
      setGiftNote,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      increase,
      decrease,
      removeItem,
      clearCart,
    }),
    [
      items,
      totalCount,
      totalPrice,
      loaded,
      isCartOpen,
      hasLuxuryPackaging,
      toggleLuxuryPackaging,
      giftNote,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      increase,
      decrease,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ---------- Kullanım kancası ---------- */

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart, CartProvider içinde kullanılmalıdır.");
  }
  return context;
}
