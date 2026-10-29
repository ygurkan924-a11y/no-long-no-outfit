"use client";

import { useState } from "react";
import Link from "next/link";
import { type Product, SIZES, type Size } from "@/data/products";
import { useCart } from "@/app/CartContext";
import { useCurrency } from "@/app/CurrencyContext";
import GarmentVisual from "./GarmentVisual";

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isBack, setIsBack] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  if (!product) return null;

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isHoodie = product.category === "Hoodie";

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }

    setError(false);

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl border border-white/20 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl">
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white text-lg transition-colors"
        >
          ✕
        </button>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          {/* Görsel Alanı */}
          <div className="relative flex aspect-square items-center justify-center border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-4">
            <GarmentVisual
              color={activeColor.hex}
              isBack={isBack}
              isHoodie={isHoodie}
              scale={1.05}
            />

            <button
              type="button"
              onClick={() => setIsBack(!isBack)}
              className="absolute bottom-3 right-3 bg-black/80 border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-white transition-colors"
            >
              {isBack ? "Ön Görünüm" : "Sırt Görünüm"} ⟲
            </button>
          </div>

          {/* Bilgi & Ekleme */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.gsm}</span>
              </div>

              <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">
                {product.name}
              </h3>

              <p className="mt-2 text-xl font-bold text-white">
                {formatPrice(product.price)}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                {product.description}
              </p>

              {/* Renkler */}
              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Renk: <span className="text-white font-normal">{activeColor.name}</span>
                </p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`h-7 w-7 rounded-full border-2 p-0.5 transition-all ${
                        idx === selectedColorIndex ? "border-white scale-110" : "border-white/20 hover:border-white/50"
                      }`}
                    >
                      <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedenler */}
              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Beden: <span className="text-white font-normal">{selectedSize ?? "Seçiniz"}</span>
                </p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s);
                        setError(false);
                      }}
                      className={`py-2 text-xs font-bold transition-all border ${
                        selectedSize === s
                          ? "bg-white text-black border-white"
                          : "border-white/20 bg-zinc-900 text-white hover:border-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {error && (
                  <p className="mt-1.5 text-[11px] uppercase tracking-wider text-red-400">
                    Lütfen bir beden seçin.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all ${
                  added ? "bg-zinc-700 text-white" : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {added ? "✓ Sepete Eklendi" : "Sepete Ekle"}
              </button>

              <div className="text-center">
                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                  Tüm Ürün Detayını Görüntüle →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

