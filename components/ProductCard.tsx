"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../app/CartContext";
import { useWishlist } from "../app/WishlistContext";
import { useCurrency } from "../app/CurrencyContext";
import { type Product, SIZES, type Size } from "@/data/products";
import GarmentVisual from "./GarmentVisual";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isHoodie = product.category === "Hoodie";
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent, size: Size) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
    });

    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      className="group relative flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Görsel Çerçevesi */}
      <div className={`relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-gradient-to-b ${product.tone} border border-white/10 transition-colors group-hover:border-white/30`}>
        {/* Rozet (Sol Üst) */}
        {product.badge && (
          <div className="absolute left-3 top-3 z-10 pointer-events-none">
            <span className="bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Favori Kalp Butonu (Sağ Üst) */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white backdrop-blur transition-all hover:scale-110 hover:border-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#ffffff" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Gerçek Ürün / Model Fotoğrafı & Vektörel Yedek */}
        {product.image ? (
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={isHovered && product.backImage ? product.backImage : product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          <GarmentVisual
            color={activeColor.hex}
            isBack={isHovered}
            isHoodie={isHoodie}
            scale={isHovered ? 1.05 : 1}
          />
        )}

        {/* Hızlı İncele Butonu (Hover'da Ortada Çıkar) */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 border border-white/30 text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur hover:bg-white hover:text-black"
          >
            Hızlı İncele
          </button>
        )}

        {/* Ürün Detay Linki */}
        <Link
          href={`/products/${product.id}`}
          aria-label={product.name}
          className="absolute inset-0 z-[5]"
        />

        {/* Hızlı Beden Seçici (Hover'da Alttan Açılır) */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-black/95 p-3 backdrop-blur-md border-t border-white/10 transition-transform duration-300 group-hover:translate-y-0 max-md:translate-y-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-center mb-2">
            {addedSize ? (
              <span className="text-white font-black">✓ {addedSize} EKLENDİ</span>
            ) : (
              "HIZLI BEDEN EKLE"
            )}
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleQuickAdd(e, size)}
                className={`py-2 text-[10px] font-bold tracking-wider transition-all border ${
                  addedSize === size
                    ? "bg-white text-black border-white"
                    : "border-white/20 bg-zinc-950 text-white hover:border-white hover:bg-white hover:text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="mt-3.5 space-y-1.5">
        {/* Renk Noktaları */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5 py-0.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={c.name}
                className={`h-3 w-3 rounded-full border p-0.5 transition-all ${
                  idx === selectedColorIndex ? "border-white scale-110" : "border-white/20 hover:border-white/50"
                }`}
              >
                <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          <span>{product.category}</span>
          <span>{product.gsm.split(" ")[0]} GSM</span>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-white group-hover:text-zinc-300 transition-colors">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="text-sm font-medium tracking-wide text-zinc-300">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
