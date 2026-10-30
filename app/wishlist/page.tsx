"use client";

import Link from "next/link";
import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";
import { useCurrency } from "../CurrencyContext";
import { PRODUCTS, type Product } from "@/data/products";
import GarmentVisual from "@/components/GarmentVisual";

const DEFAULT_SIZE = "M";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist, totalWishlistCount } = useWishlist();
  const { addItem, totalCount, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const favoritedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleAddToCart = (product: Product) => {
    const defaultColor = product.colors[0];
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: DEFAULT_SIZE,
      colorName: defaultColor ? defaultColor.name : "Varsayılan",
      colorHex: defaultColor ? defaultColor.hex : product.garment,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      {/* Üst duyuru çubuğu */}
      <div className="bg-white py-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-black">
        Ücretsiz Kargo · {formatPrice(1500)} ve Üzeri Siparişlerde
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-black uppercase leading-none tracking-[0.3em] sm:text-base">
            NO LONG
            <br />
            NO OUTFIT
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
            >
              ← Alışverişe Dön
            </Link>
            <button onClick={openCart} aria-label="Sepet" className="relative transition-opacity hover:opacity-70">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 8h14l-1 12H6L5 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Favorilerim</span>
        </nav>

        <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl">
          İstek Listem
          {totalWishlistCount > 0 && (
            <span className="ml-4 align-top text-sm font-semibold tracking-[0.2em] text-zinc-500">
              ({totalWishlistCount} parça)
            </span>
          )}
        </h1>

        {/* Boş İstek Listesi */}
        {favoritedProducts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center border border-white/10 bg-zinc-950 px-5 py-24 text-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-zinc-500"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h2 className="mt-6 text-2xl font-black uppercase tracking-tighter">İstek Listeniz Boş</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Beğendiğiniz parçaları kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
            </p>
            <Link
              href="/"
              className="mt-8 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        ) : (
          /* Dolu Liste */
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {favoritedProducts.map((product) => (
              <article key={product.id} className="group relative flex flex-col justify-between">
                <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-zinc-950 border border-white/10">
                  {product.image ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`h-full w-full object-cover transition-all duration-700 ${
                          product.backImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                        }`}
                      />
                      {product.backImage && (
                        <img
                          src={product.backImage}
                          alt={`${product.name} arka görünüm`}
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}
                    </>
                  ) : (
                    <GarmentVisual
                      color={product.colors[0]?.hex || product.garment}
                      isHoodie={product.category === "Hoodie"}
                    />
                  )}

                  {/* Silme Butonu */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Favorilerden kaldır"
                    className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-zinc-400 hover:text-white transition-colors border border-white/10"
                  >
                    ✕
                  </button>

                  <Link href={`/products/${product.id}`} className="absolute inset-0 z-[5]" />

                  {/* Sepete Ekle Butonu */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute inset-x-0 bottom-0 z-20 py-3 bg-white text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors"
                  >
                    Sepete Ekle (M)
                  </button>
                </div>

                <div className="mt-3.5 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    {product.category} · {product.gsm.split(" ")[0]} GSM
                  </p>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                    <Link href={`/products/${product.id}`} className="hover:text-zinc-300">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-medium text-zinc-300">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

