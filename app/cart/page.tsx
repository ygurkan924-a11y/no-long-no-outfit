"use client";

import Link from "next/link";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { useCurrency } from "../CurrencyContext";

/* ---------- Ayarlar ---------- */

const FREE_SHIPPING_THRESHOLD = 1500; // Bu tutar ve üzeri siparişlerde kargo ücretsiz
const SHIPPING_FEE = 59; // Altında ise uygulanacak kargo ücreti
const MAX_QUANTITY = 10; // CartContext.tsx içindeki sınırla aynı olmalı

/* ---------- Simgeler ---------- */

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const BagIcon = () => (
  <svg {...iconProps}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
);

const TrashIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 13h10l1-13" />
    <path d="M9 7V4h6v3" />
  </svg>
);

function GarmentThumb({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-3/4 w-3/4" aria-hidden="true">
      <path
        d="M20 10 L35 4 Q50 14 65 4 L80 10 L95 28 L82 38 L76 32 L76 92 L24 92 L24 32 L18 38 L5 28 Z"
        fill={color}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

/* ---------- Sepet sayfası ---------- */

export default function CartPage() {
  const { items, totalCount, totalPrice, loaded, increase, decrease, removeItem } = useCart();
  const { totalWishlistCount } = useWishlist();
  const { formatPrice } = useCurrency();

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shipping;
  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      {/* Duyuru çubuğu */}
      <div className="bg-white py-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-black">
        Ücretsiz Kargo · {formatPrice(FREE_SHIPPING_THRESHOLD)} ve Üzeri Siparişlerde
      </div>

      {/* Üst menü */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-black uppercase leading-none tracking-[0.3em] sm:text-base">
            NO LONG
            <br />
            NO OUTFIT
          </Link>
          <div className="flex items-center gap-5 sm:gap-6">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white hidden sm:block"
            >
              ← Alışverişe Dön
            </Link>
            <Link href="/wishlist" aria-label="Favorilerim" className="relative transition-opacity hover:opacity-70">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {totalWishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalWishlistCount}
                </span>
              )}
            </Link>
            <Link href="/account" aria-label="Hesabım" className="transition-opacity hover:opacity-70">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
            <Link href="/cart" aria-label="Sepet" className="relative transition-opacity hover:opacity-70">
              <BagIcon />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Gezinme yolu */}
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Koleksiyon
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Sepet</span>
        </nav>

        <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl">
          Sepetim
          {loaded && totalCount > 0 && (
            <span className="ml-4 align-top text-sm font-semibold tracking-[0.2em] text-zinc-500">
              ({totalCount} parça)
            </span>
          )}
        </h1>

        {/* Yükleniyor */}
        {!loaded && (
          <div className="mt-12 space-y-4" aria-hidden="true">
            {[0, 1].map((n) => (
              <div key={n} className="h-36 animate-pulse border border-white/10 bg-zinc-950" />
            ))}
          </div>
        )}

        {/* Boş sepet */}
        {loaded && items.length === 0 && (
          <div className="mt-12 flex flex-col items-center border border-white/10 bg-zinc-950 px-5 py-20 text-center sm:py-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-zinc-400">
              <BagIcon />
            </div>
            <h2 className="mt-6 text-2xl font-black uppercase tracking-tighter sm:text-3xl">Sepetiniz Boş</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Yeni sezon parçalarına göz atmaya ne dersin?
            </p>
            <Link
              href="/"
              className="mt-8 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
            >
              Alışverişe Başla
            </Link>
          </div>
        )}

        {/* Dolu sepet */}
        {loaded && items.length > 0 && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            {/* Ürün listesi */}
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-6 sm:gap-6">
                  {/* Görsel */}
                  <Link
                    href={`/products/${item.productId}`}
                    aria-label={item.name}
                    className="flex aspect-[3/4] w-24 shrink-0 items-center justify-center bg-gradient-to-b from-zinc-800 to-black sm:w-32 border border-white/10"
                  >
                    <GarmentThumb color={item.colorHex} />
                  </Link>

                  {/* Bilgiler */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-sm font-bold uppercase tracking-wide sm:text-base">
                          <Link href={`/products/${item.productId}`} className="transition-colors hover:text-zinc-300">
                            {item.name}
                          </Link>
                        </h2>
                        <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-white/30"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.colorName}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Beden: <span className="font-bold text-white">{item.size}</span>
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Birim Fiyat: <span className="text-zinc-300">{formatPrice(item.price)}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`${item.name} ürününü sepetten sil`}
                        className="shrink-0 p-1 text-zinc-500 transition-colors hover:text-white"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      {/* Adet */}
                      <div className="flex items-center border border-white/20 bg-zinc-950">
                        <button
                          onClick={() => decrease(item.key)}
                          disabled={item.quantity <= 1}
                          aria-label="Adedi azalt"
                          className="flex h-10 w-10 items-center justify-center text-lg transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:text-zinc-700 disabled:hover:bg-transparent"
                        >
                          −
                        </button>
                        <span className="flex h-10 w-10 items-center justify-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.key)}
                          disabled={item.quantity >= MAX_QUANTITY}
                          aria-label="Adedi artır"
                          className="flex h-10 w-10 items-center justify-center text-lg transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:text-zinc-700 disabled:hover:bg-transparent"
                        >
                          +
                        </button>
                      </div>

                      {/* Satır toplamı */}
                      <p className="text-base font-bold sm:text-lg">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Sipariş özeti */}
            <aside className="h-fit border border-white/10 bg-zinc-950 p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Sipariş Özeti</h2>

              {/* Ücretsiz kargo ilerlemesi */}
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                  {remainingForFree > 0
                    ? `Ücretsiz kargoya ${formatPrice(remainingForFree)} kaldı`
                    : "Ücretsiz kargo kazandın ✓"}
                </p>
                <div className="mt-3 h-1 w-full bg-white/10">
                  <div className="h-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-400">Ara Toplam</dt>
                  <dd>{formatPrice(totalPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-400">Kargo</dt>
                  <dd>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold">
                  <dt className="uppercase tracking-[0.2em]">Toplam</dt>
                  <dd className="text-white">{formatPrice(grandTotal)}</dd>
                </div>
              </dl>

              {/* Ödemeye Geç butonu */}
              <Link
                href="/checkout"
                className="mt-8 block w-full bg-white py-5 text-center text-xs font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-zinc-200"
              >
                Ödemeye Geç →
              </Link>

              <Link
                href="/"
                className="mt-4 block w-full border border-white/30 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Alışverişe Devam Et
              </Link>
            </aside>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
