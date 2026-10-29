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

type WishlistContextValue = {
  wishlistIds: number[];
  totalWishlistCount: number;
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
};

const STORAGE_KEY = "nlno-wishlist";

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Tarayıcıdan oku
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setWishlistIds(parsed);
        }
      }
    } catch {
      // sessizce geç
    }
    setLoaded(true);
  }, []);

  // Değişince kaydet
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // depolama doluysa sessizce geç
    }
  }, [wishlistIds, loaded]);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isWishlisted = useCallback(
    (productId: number) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const clearWishlist = useCallback(() => setWishlistIds([]), []);

  const value = useMemo(
    () => ({
      wishlistIds,
      totalWishlistCount: wishlistIds.length,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      clearWishlist,
    }),
    [wishlistIds, toggleWishlist, isWishlisted, removeFromWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist, WishlistProvider içinde kullanılmalıdır.");
  }
  return context;
}

