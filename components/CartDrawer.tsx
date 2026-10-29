"use client";

import Link from "next/link";
import { useCart, LUXURY_PACKAGING_FEE } from "@/app/CartContext";
import { useCurrency } from "@/app/CurrencyContext";

const FREE_SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 59;
const MAX_QUANTITY = 10;

function GarmentThumb({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-4/5 w-4/5" aria-hidden="true">
      <path
        d="M20 10 L35 4 Q50 14 65 4 L80 10 L95 28 L82 38 L76 32 L76 92 L24 92 L24 32 L18 38 L5 28 Z"
        fill={color}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    totalCount,
    totalPrice,
    increase,
    decrease,
    removeItem,
    hasLuxuryPackaging,
    toggleLuxuryPackaging,
    giftNote,
    setGiftNote,
  } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  const packaging = hasLuxuryPackaging ? LUXURY_PACKAGING_FEE : 0;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shipping + packaging;
  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Karartma tıklandığında kapat */}
      <div className="flex-1 cursor-pointer" onClick={closeCart} aria-label="Kapat" />

      {/* Sağ Panel */}
      <div className="relative flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl animate-slide-left">
        {/* Üst Başlık & Kapat */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-black uppercase tracking-[0.25em]">Sepetim</h2>
              <span className="text-xs font-mono text-zinc-500">({totalCount} Parça)</span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Sepeti kapat"
              className="flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white text-lg transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Ücretsiz Kargo İlerleme Çubuğu */}
          <div className="mt-4 border border-white/5 bg-black/60 p-3">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400">
              {remainingForFree > 0
                ? `Ücretsiz kargoya ${formatPrice(remainingForFree)} kaldı`
                : "✓ Tebrikler! Ücretsiz kargo kazandınız"}
            </p>
            <div className="mt-2 h-1 w-full bg-white/10">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ürün Listesi */}
        <div className="flex-1 overflow-y-auto py-4 divide-y divide-white/10">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-6">
              <p className="text-sm uppercase tracking-widest text-zinc-400">Sepetiniz Boş</p>
              <button
                onClick={closeCart}
                className="mt-4 border border-white/30 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:border-white hover:bg-white hover:text-black transition-colors"
              >
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-4 py-4">
                {/* Görsel */}
                <div className="flex h-20 w-16 shrink-0 items-center justify-center bg-zinc-900 border border-white/10">
                  <GarmentThumb color={item.colorHex} />
                </div>

                {/* Detaylar */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold uppercase tracking-wide truncate text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                        {item.size} · {item.colorName}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label="Sil"
                      className="text-zinc-500 hover:text-white text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Adet Artır / Azalt */}
                    <div className="flex items-center border border-white/20 bg-black">
                      <button
                        onClick={() => decrease(item.key)}
                        disabled={item.quantity <= 1}
                        className="h-6 w-6 text-xs text-zinc-400 hover:text-white disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => increase(item.key)}
                        disabled={item.quantity >= MAX_QUANTITY}
                        className="h-6 w-6 text-xs text-zinc-400 hover:text-white disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    {/* Toplam Satır Tutarı */}
                    <p className="text-xs font-bold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alt Özet & Checkout Butonu */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            {/* Lüks Mat Kutu & Paketleme */}
            <div className="border border-white/10 bg-black/60 p-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLuxuryPackaging}
                  onChange={toggleLuxuryPackaging}
                  className="mt-0.5 h-3.5 w-3.5 accent-white rounded border-white/20 bg-black"
                />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-white block">
                    NLNO Mat Siyah Mühürlü Kutu (+{formatPrice(LUXURY_PACKAGING_FEE)})
                  </span>
                  <span className="text-zinc-500 text-[10px]">
                    İpek kağıt ve tipo baskılı koleksiyon paketlemesi
                  </span>
                </div>
              </label>
              {hasLuxuryPackaging && (
                <input
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Kişisel kart notunuz (isteğe bağlı)..."
                  className="mt-2.5 w-full border border-white/20 bg-zinc-900 px-2.5 py-1 text-[11px] text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                />
              )}
            </div>

            <div className="flex justify-between text-xs text-zinc-400">
              <span>Ara Toplam</span>
              <span className="text-white">{formatPrice(totalPrice)}</span>
            </div>
            {hasLuxuryPackaging && (
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Özel Kutu & Paketleme</span>
                <span className="text-white">{formatPrice(LUXURY_PACKAGING_FEE)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Kargo</span>
              <span className="text-white">{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-2">
              <span className="uppercase tracking-wider">Toplam</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-3 block w-full bg-white py-4 text-center text-xs font-black uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Ödemeye Geç →
            </Link>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              Sepet Sayfasını Görüntüle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

