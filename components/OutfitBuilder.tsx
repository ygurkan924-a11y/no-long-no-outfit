"use client";

import { useState } from "react";
import { PRODUCTS, SIZES, type Size } from "@/data/products";
import { useCart } from "@/app/CartContext";
import { useCurrency } from "@/app/CurrencyContext";
import GarmentVisual from "./GarmentVisual";

export default function OutfitBuilder() {
  const tops = PRODUCTS.filter((p) => p.category !== "Alt Giyim");
  const bottoms = PRODUCTS.filter((p) => p.category === "Alt Giyim");

  const [selectedTopId, setSelectedTopId] = useState<number>(tops[0]?.id || 1);
  const [selectedBottomId, setSelectedBottomId] = useState<number>(bottoms[0]?.id || 9);

  const [topSize, setTopSize] = useState<Size>("L");
  const [bottomSize, setBottomSize] = useState<Size>("M");
  const [added, setAdded] = useState(false);

  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const selectedTop = tops.find((p) => p.id === selectedTopId) || tops[0];
  const selectedBottom = bottoms.find((p) => p.id === selectedBottomId) || bottoms[0];

  const subtotal = (selectedTop ? selectedTop.price : 0) + (selectedBottom ? selectedBottom.price : 0);
  const bundleDiscount = Math.round(subtotal * 0.1); // %10 Kombin İndirimi
  const bundleTotal = subtotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    if (!selectedTop || !selectedBottom) return;

    // Üst parça ekle
    addItem({
      productId: selectedTop.id,
      name: selectedTop.name,
      price: Math.round(selectedTop.price * 0.9), // %10 indirimli birim
      size: topSize,
      colorName: selectedTop.colors[0]?.name || "Varsayılan",
      colorHex: selectedTop.colors[0]?.hex || selectedTop.garment,
    });

    // Alt parça ekle
    addItem({
      productId: selectedBottom.id,
      name: selectedBottom.name,
      price: Math.round(selectedBottom.price * 0.9),
      size: bottomSize,
      colorName: selectedBottom.colors[0]?.name || "Varsayılan",
      colorHex: selectedBottom.colors[0]?.hex || selectedBottom.garment,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 400);
  };

  return (
    <section id="outfit-builder" className="scroll-mt-20 border-t border-white/10 bg-black py-20 sm:py-28 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Başlık */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              STÜDYO MİX & MATCH
            </span>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Kendi Kombinini Yarat
            </h2>
          </div>
          <p className="mt-3 max-w-md text-xs text-zinc-400 md:mt-0 uppercase tracking-widest leading-relaxed">
            Üst ve alt parçaları eşleştirin, sokak silüetini anında görün. Birlikte alımda <span className="text-white font-bold">%10 Kombin İndirimi</span> kazanın.
          </p>
        </div>

        {/* Ana Stüdyo Alanı */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Sol: Üst Parça Seçimi (4 Kolon) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">1. Üst Parça</span>
              <span className="text-[11px] font-mono text-zinc-500">{selectedTop.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 max-h-80 overflow-y-auto pr-1">
              {tops.map((top) => (
                <button
                  key={top.id}
                  type="button"
                  onClick={() => setSelectedTopId(top.id)}
                  className={`flex flex-col items-start p-3 text-left border transition-all ${
                    selectedTopId === top.id
                      ? "border-white bg-zinc-900"
                      : "border-white/10 bg-zinc-950/60 hover:border-white/30"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase truncate w-full">{top.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{top.gsm.split(" ")[0]} GSM</p>
                  <p className="text-xs font-semibold text-zinc-300 mt-2">{formatPrice(top.price)}</p>
                </button>
              ))}
            </div>

            {/* Üst Beden */}
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Üst Beden</label>
              <div className="mt-1.5 flex gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setTopSize(sz)}
                    className={`flex-1 py-1.5 text-xs font-mono font-bold border transition-colors ${
                      topSize === sz ? "border-white bg-white text-black" : "border-white/20 text-zinc-400 hover:border-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orta: Canlı Silüet Önizleme (4 Kolon) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border border-white/10 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-6 sm:p-8 relative">
            <span className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-zinc-500">
              LIVE SILHOUETTE
            </span>
            <span className="absolute top-4 right-4 bg-white text-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
              %10 İNDİRİM
            </span>

            {/* Üst Görsel */}
            <div className="relative h-44 w-44 flex items-center justify-center">
              <GarmentVisual
                color={selectedTop.colors[0]?.hex || selectedTop.garment}
                isHoodie={selectedTop.category === "Hoodie"}
                scale={0.9}
              />
            </div>

            {/* Ayırıcı Çizgi */}
            <div className="h-px w-24 bg-white/10 my-2" />

            {/* Alt Görsel Simülasyonu */}
            <div className="relative h-36 w-36 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                <path
                  d="M20 10 L80 10 L76 90 L56 90 L50 40 L44 90 L24 90 Z"
                  fill={selectedBottom.colors[0]?.hex || "#18181b"}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Parça İsimleri Özeti */}
            <div className="mt-4 text-center">
              <p className="text-xs font-bold uppercase text-white truncate max-w-xs">{selectedTop.name}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">+</p>
              <p className="text-xs font-bold uppercase text-white truncate max-w-xs">{selectedBottom.name}</p>
            </div>
          </div>

          {/* Sağ: Alt Parça Seçimi & Satın Alım (4 Kolon) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">2. Alt Parça</span>
              <span className="text-[11px] font-mono text-zinc-500">{selectedBottom.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-2">
              {bottoms.map((bot) => (
                <button
                  key={bot.id}
                  type="button"
                  onClick={() => setSelectedBottomId(bot.id)}
                  className={`flex flex-col items-start p-3 text-left border transition-all ${
                    selectedBottomId === bot.id
                      ? "border-white bg-zinc-900"
                      : "border-white/10 bg-zinc-950/60 hover:border-white/30"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase truncate w-full">{bot.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{bot.gsm.split(" ")[0]} GSM</p>
                  <p className="text-xs font-semibold text-zinc-300 mt-2">{formatPrice(bot.price)}</p>
                </button>
              ))}
            </div>

            {/* Alt Beden */}
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Alt Beden</label>
              <div className="mt-1.5 flex gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setBottomSize(sz)}
                    className={`flex-1 py-1.5 text-xs font-mono font-bold border transition-colors ${
                      bottomSize === sz ? "border-white bg-white text-black" : "border-white/20 text-zinc-400 hover:border-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Fiyatlandırma & Satın Alım Kartı */}
            <div className="border border-white/20 bg-zinc-950 p-4 mt-6 space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Normal Toplam:</span>
                <span className="line-through">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400 font-bold">
                <span>Kombin Avantajı (%10):</span>
                <span>-{formatPrice(bundleDiscount)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Ödenecek Tutar:</span>
                <span className="text-xl font-black text-white">{formatPrice(bundleTotal)}</span>
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full bg-white py-3.5 text-xs font-black uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300 active:scale-95"
              >
                {added ? "✓ KOMBİN EKLENDİ" : "KOMBİNİ SEPETE EKLE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

