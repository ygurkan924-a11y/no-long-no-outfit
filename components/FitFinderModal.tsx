"use client";

import { useState } from "react";
import { type Size } from "@/data/products";

export default function FitFinderModal({
  isOpen,
  onClose,
  onSelectSize,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: Size) => void;
}) {
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(76);
  const [preference, setPreference] = useState<"oversize" | "fitted">("oversize");

  if (!isOpen) return null;

  // Akıllı Beden Hesaplama Algoritması
  const calculateSize = (): { size: Size; desc: string } => {
    let base: Size = "M";

    if (height < 172 && weight < 68) {
      base = "S";
    } else if (height <= 180 && weight <= 78) {
      base = "M";
    } else if (height <= 186 && weight <= 88) {
      base = "L";
    } else if (height <= 192 && weight <= 98) {
      base = "XL";
    } else {
      base = "XXL";
    }

    // Tercihe göre ayarlama
    if (preference === "fitted") {
      if (base === "XXL") base = "XL";
      else if (base === "XL") base = "L";
      else if (base === "L") base = "M";
      else if (base === "M") base = "S";
    }

    const desc =
      preference === "oversize"
        ? `${height} cm ve ${weight} kg için ${base} beden, markanın imza dökümlü ve geniş omuzlu sokak silüetini kusursuz şekilde sunacaktır.`
        : `${height} cm ve ${weight} kg için ${base} beden, daha derli toplu ve standart bir duruş sağlayacaktır.`;

    return { size: base, desc };
  };

  const recommendation = calculateSize();

  const handleApply = () => {
    if (onSelectSize) {
      onSelectSize(recommendation.size);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg border border-white/20 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl">
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white text-lg transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
            NLNO FIT FINDER
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs uppercase tracking-widest text-zinc-400">BEDEN SİHİRBAZI</span>
        </div>

        <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">
          Akıllı Beden Hesaplayıcı
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          Boy, kilo ve kalıp tercihinize göre en kusursuz duruşu hesaplayalım.
        </p>

        {/* Inputlar */}
        <div className="mt-6 space-y-5">
          {/* Boy */}
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-300">
              <span>Boyunuz</span>
              <span className="text-white font-mono text-sm">{height} cm</span>
            </div>
            <input
              type="range"
              min={155}
              max={205}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-2 w-full accent-white"
            />
          </div>

          {/* Kilo */}
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-300">
              <span>Kilonuz</span>
              <span className="text-white font-mono text-sm">{weight} kg</span>
            </div>
            <input
              type="range"
              min={48}
              max={125}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="mt-2 w-full accent-white"
            />
          </div>

          {/* Kalıp Tercihi */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
              Kalıp Duruş Tercihi
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPreference("oversize")}
                className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                  preference === "oversize"
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-zinc-400 hover:border-white"
                }`}
              >
                Dökümlü Oversize
              </button>
              <button
                type="button"
                onClick={() => setPreference("fitted")}
                className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                  preference === "fitted"
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-zinc-400 hover:border-white"
                }`}
              >
                Daha Standart / Fit
              </button>
            </div>
          </div>
        </div>

        {/* Sonuç Kartı */}
        <div className="mt-6 border border-white/10 bg-black/80 p-5 text-center">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            ÖNERİLEN BEDEN
          </span>
          <p className="mt-1 text-4xl font-black text-white">{recommendation.size}</p>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{recommendation.desc}</p>
        </div>

        {/* Butonlar */}
        <div className="mt-6 flex gap-3">
          {onSelectSize && (
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 bg-white py-3.5 text-xs font-black uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors"
            >
              {recommendation.size} Bedenini Seç & Kapat
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="border border-white/30 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-zinc-900 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

