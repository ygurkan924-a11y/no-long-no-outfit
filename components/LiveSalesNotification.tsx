"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const RECENT_SALES = [
  {
    location: "Kadıköy, İstanbul",
    product: "NLNO 02 Heavy Hoodie",
    size: "L",
    time: "2 dk önce",
    productId: 2,
    color: "#09090b",
  },
  {
    location: "Nişantaşı, İstanbul",
    product: "NLNO 01 Boxy Heavy Tee",
    size: "M",
    time: "4 dk önce",
    productId: 1,
    color: "#18181b",
  },
  {
    location: "Çankaya, Ankara",
    product: "NLNO 05 Heavy Zip Hoodie",
    size: "XL",
    time: "7 dk önce",
    productId: 5,
    color: "#27272a",
  },
  {
    location: "Alsancak, İzmir",
    product: "NLNO 06 Raw Street Cargo",
    size: "M",
    time: "11 dk önce",
    productId: 6,
    color: "#141416",
  },
  {
    location: "Berlin, Almanya",
    product: "NLNO 03 Acid Wash Boxy Tee",
    size: "L",
    time: "15 dk önce",
    productId: 3,
    color: "#3f3f46",
  },
];

export default function LiveSalesNotification() {
  const [currentSale, setCurrentSale] = useState<typeof RECENT_SALES[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) return;

    let index = 0;

    // İlk gösterim 4 saniye sonra
    const initialTimer = setTimeout(() => {
      setCurrentSale(RECENT_SALES[index]);
      setVisible(true);

      // 5 saniye sonra gizle
      setTimeout(() => setVisible(false), 5000);
    }, 4000);

    // Her 18 saniyede bir yeni satış bildirimi
    const interval = setInterval(() => {
      index = (index + 1) % RECENT_SALES.length;
      setCurrentSale(RECENT_SALES[index]);
      setVisible(true);

      setTimeout(() => setVisible(false), 5500);
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [disabled]);

  if (disabled || !currentSale || !visible) return null;

  return (
    <aside
      aria-label="Canlı Satış Bildirimi"
      className="fixed bottom-5 left-5 z-40 max-w-sm rounded border border-white/20 bg-zinc-950/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-500 ease-out animate-slide-right text-white"
    >
      <div className="flex items-center gap-3">
        {/* Ürün Minyatür Çizimi */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10"
          style={{ backgroundColor: currentSale.color }}
        >
          <svg viewBox="0 0 100 100" className="h-6 w-6" aria-hidden="true">
            <path
              d="M20 10 L35 4 Q50 14 65 4 L80 10 L95 28 L82 38 L76 32 L76 92 L24 92 L24 32 L18 38 L5 28 Z"
              fill="#ffffff"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Bilgi */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentSale.location}</span>
            <span>·</span>
            <span className="font-mono text-zinc-500">{currentSale.time}</span>
          </div>
          <Link
            href={`/products/${currentSale.productId}`}
            className="mt-0.5 block truncate text-xs font-bold uppercase tracking-wide text-white hover:underline"
          >
            {currentSale.product} ({currentSale.size})
          </Link>
          <p className="text-[10px] text-zinc-400">Sipariş kargoya hazırlanıyor</p>
        </div>

        {/* Kapat Butonu */}
        <button
          onClick={() => setDisabled(true)}
          aria-label="Bildirimleri Kapat"
          className="ml-1 text-xs text-zinc-500 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}

