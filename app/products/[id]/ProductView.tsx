"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../CartContext";
import { useWishlist } from "../../WishlistContext";
import { useCurrency } from "../../CurrencyContext";
import { getProductById, getComplementaryProducts, SIZES, type Size, type Review } from "@/data/products";
import GarmentVisual from "@/components/GarmentVisual";
import SizeGuideModal from "@/components/SizeGuideModal";
import FitFinderModal from "@/components/FitFinderModal";

const VIEWS = [
  { label: "Ön Görünüm", bg: "from-zinc-900 to-black", back: false },
  { label: "Sırt Görünüm", bg: "from-zinc-950 to-black", back: true },
];

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

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg {...iconProps} fill={filled ? "#ffffff" : "none"}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const UserIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
);

export default function ProductView({ id }: { id: string }) {
  const product = getProductById(id);
  const complementaryProducts = product ? getComplementaryProducts(product.id) : [];

  const [viewIndex, setViewIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [fitFinderOpen, setFitFinderOpen] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  // Yorum State
  const [reviewsList, setReviewsList] = useState<Review[]>(product?.reviews || []);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newStats, setNewStats] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  const { totalCount, addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist, totalWishlistCount } = useWishlist();
  const { formatPrice, currency, setCurrency } = useCurrency();

  const wishlisted = product ? isWishlisted(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;

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
      colorName: product.colors[colorIndex].name,
      colorHex: product.colors[colorIndex].hex,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: "Şimdi",
      comment: newComment,
      userStats: newStats || undefined,
      verified: true,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setWriteReviewOpen(false);
    setNewAuthor("");
    setNewStats("");
    setNewComment("");
  };

  const header = (
    <>
      <div className="bg-white py-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-black">
        Ücretsiz Kargo · {formatPrice(1500)} ve Üzeri Siparişlerde
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-black uppercase leading-none tracking-[0.3em] sm:text-base">
            NO LONG
            <br />
            NO OUTFIT
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Para Birimi Değiştirici */}
            <div className="relative group hidden sm:block">
              <button
                type="button"
                aria-label="Para Birimi Değiştir"
                className="flex items-center gap-1 border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                <span>{currency}</span>
                <span className="text-[9px] text-zinc-500">▼</span>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col border border-white/20 bg-zinc-950 p-1 shadow-2xl z-50 min-w-[75px]">
                {(["TRY", "USD", "EUR"] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1.5 text-left text-[11px] font-mono tracking-wider transition-colors ${
                      currency === curr
                        ? "bg-white text-black font-bold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white hidden sm:block"
            >
              ← Alışverişe Dön
            </Link>

            <Link href="/wishlist" aria-label="Favorilerim" className="relative transition-opacity hover:opacity-70">
              <HeartIcon />
              {totalWishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            <Link href="/account" aria-label="Hesabım" className="transition-opacity hover:opacity-70">
              <UserIcon />
            </Link>

            <button
              onClick={openCart}
              aria-label="Sepet"
              className="relative transition-opacity hover:opacity-70"
            >
              <BagIcon />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white antialiased">
        {header}
        <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Ürün bulunamadı</h1>
          <p className="mt-4 text-sm text-zinc-400">Aradığın parça mevcut değil ya da kaldırılmış olabilir.</p>
          <Link
            href="/"
            className="mt-8 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const activeColor = product.colors[colorIndex] || product.colors[0];
  const activeView = VIEWS[viewIndex];
  const isHoodie = product.category === "Hoodie";

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      {header}

      {/* Beden Rehberi Modalı */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Akıllı Beden Sihirbazı Modalı */}
      <FitFinderModal
        isOpen={fitFinderOpen}
        onClose={() => setFitFinderOpen(false)}
        onSelectSize={(sz) => setSelectedSize(sz)}
      />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">Koleksiyon</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Görsel Alanı */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row">
            {/* Küçük Görsel Sekmeleri */}
            <div className="flex gap-3 lg:flex-col">
              {VIEWS.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setViewIndex(i)}
                  className={`relative flex aspect-[3/4] w-20 flex-col items-center justify-center border transition-all ${
                    i === viewIndex
                      ? "border-white bg-zinc-900"
                      : "border-white/10 bg-black hover:border-white/40"
                  }`}
                >
                  <div className="h-14 w-14">
                    <GarmentVisual
                      color={activeColor.hex}
                      isBack={v.back}
                      isHoodie={isHoodie}
                    />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
                    {v.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Büyük Ana Görsel */}
            <div
              className={`relative flex aspect-[4/5] flex-1 items-center justify-center overflow-hidden border border-white/10 bg-gradient-to-b ${activeView.bg}`}
            >
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  {product.badge}
                </span>
              )}

              <span className="absolute right-4 top-4 z-10 bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] font-mono tracking-widest text-zinc-400">
                {product.gsm}
              </span>

              <div className="h-full w-full flex items-center justify-center p-8">
                <GarmentVisual
                  color={activeColor.hex}
                  isBack={activeView.back}
                  isHoodie={isHoodie}
                  scale={1.1}
                />
              </div>

              {/* Görünüm Değiştir Butonu */}
              <button
                onClick={() => setViewIndex((prev) => (prev === 0 ? 1 : 0))}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 border border-white/20 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur hover:border-white hover:bg-white hover:text-black transition-colors"
              >
                <span>{activeView.back ? "Ön Görünüme Geç" : "Sırt Görünümünü Gör"}</span>
                <span>⟲</span>
              </button>
            </div>
          </div>

          {/* Ürün Bilgileri ve Satın Alma */}
          <div className="lg:py-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {product.category}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {product.fit}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-xs text-zinc-400">
                  ★ {product.rating} ({product.reviewCount} Değerlendirme)
                </span>
              </div>

              <h1 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-4">
                <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
                <span className="text-xs uppercase tracking-widest text-zinc-400">
                  ✓ Stokta Hazır · Hızlı Kargo
                </span>
              </div>

              {/* Canlı Ziyaretçi & Stok Aciliyeti */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Şu anda 14 kişi bu parçayı inceliyor</span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">·</span>
                <span className="text-amber-400 font-semibold">⚡ Sınırlı Üretim (Koleksiyon Sonu)</span>
              </div>

              <div className="my-6 h-px bg-white/10" />

              {/* Renk Seçimi */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em]">
                  Renk: <span className="font-normal text-zinc-400">{activeColor.name}</span>
                </p>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIndex(i)}
                      aria-label={c.name}
                      className={`h-10 w-10 rounded-full border-2 p-0.5 transition-all ${
                        i === colorIndex
                          ? "border-white scale-110 shadow-lg"
                          : "border-white/20 hover:border-white/50"
                      }`}
                    >
                      <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Beden Seçimi & Boy/Kilo Rehberleri */}
              <div className="mt-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.25em]">
                    Beden: <span className="font-normal text-zinc-400">{selectedSize ?? "Lütfen Seçin"}</span>
                  </p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFitFinderOpen(true)}
                      className="border-b border-white pb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors"
                    >
                      ⚡ Beden Sihirbazı
                    </button>
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="border-b border-white/30 pb-0.5 text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                    >
                      Ölçü Tablosu
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2.5">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSize(s);
                        setError(false);
                      }}
                      className={`py-4 text-sm font-bold transition-all ${
                        selectedSize === s
                          ? "bg-white text-black shadow-lg"
                          : "border border-white/20 text-white hover:border-white hover:bg-zinc-900"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="mt-2.5 text-[11px] font-mono text-amber-400">
                    🔥 Dikkat: {selectedSize} beden için atölye stoğunda son 2 adet kaldı.
                  </p>
                )}
                {error && (
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-red-400">
                    Lütfen bir beden seçimi yapın.
                  </p>
                )}
              </div>

              {/* Sepete Ekle & Favorilere Ekle Buton Grubu */}
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 shadow-xl ${
                    added
                      ? "bg-zinc-700 text-white"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  {added ? "✓ Sepete Eklendi" : "Sepete Ekle"}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Favorilere ekle"
                  className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center border transition-all ${
                    wishlisted
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-white hover:border-white hover:bg-zinc-900"
                  }`}
                >
                  <HeartIcon filled={wishlisted} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] uppercase tracking-wider text-zinc-400">
                <div className="border border-white/5 bg-zinc-950 p-3">
                  <p className="font-bold text-white">Hızlı Gönderim</p>
                  <p className="text-zinc-500 mt-0.5">14:00&apos;e kadar verilen siparişler aynı gün çıkar</p>
                </div>
                <div className="border border-white/5 bg-zinc-950 p-3">
                  <p className="font-bold text-white">Kolay Değişim</p>
                  <p className="text-zinc-500 mt-0.5">14 gün içinde ücretsiz beden değişimi</p>
                </div>
              </div>
            </div>

            {/* Kumaş ve Tasarım Detayları */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-300">
                Ürün Detayları & Kumaş
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{product.description}</p>

              <ul className="mt-4 space-y-2 text-xs uppercase tracking-wider text-zinc-400">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="text-white">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* KOMBİNİ TAMAMLA / BUNUNLA İYİ GİDER BÖLÜMÜ */}
        {complementaryProducts.length > 0 && (
          <section className="mt-24 border-t border-white/10 pt-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  STREETWEAR KOMBİNİ
                </span>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  Bununla İyi Gider
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {complementaryProducts.map((item) => (
                <div key={item.id} className="border border-white/10 bg-zinc-950 p-4 flex flex-col justify-between">
                  <div className="relative aspect-square flex items-center justify-center bg-black/60 border border-white/5">
                    <GarmentVisual
                      color={item.colors[0]?.hex || item.garment}
                      isHoodie={item.category === "Hoodie"}
                    />
                    <Link href={`/products/${item.id}`} className="absolute inset-0" />
                  </div>
                  <div className="mt-3">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">{item.category}</p>
                    <h3 className="text-xs font-bold uppercase text-white truncate">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs font-semibold text-zinc-300 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MÜŞTERİ DEĞERLENDİRMELERİ & YORUMLAR */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                DOĞRULANMIŞ ALICILAR
              </span>
              <h2 className="mt-1 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                Müşteri Yorumları ({reviewsList.length})
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-white">{product.rating} / 5.0</span>
                <span className="text-xs text-zinc-500">· %100 memnuniyet oranı</span>
              </div>
            </div>

            <button
              onClick={() => setWriteReviewOpen(!writeReviewOpen)}
              className="border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:border-white hover:bg-white hover:text-black transition-colors"
            >
              {writeReviewOpen ? "Vazgeç" : "Yorum Yaz"}
            </button>
          </div>

          {/* Yorum Yazma Formu */}
          {writeReviewOpen && (
            <form onSubmit={handleAddReview} className="mb-10 border border-white/10 bg-zinc-950 p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Deneyiminizi Paylaşın</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Adınız
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="örn: Caner K."
                    className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Boy / Kilo & Beden (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={newStats}
                    onChange={(e) => setNewStats(e.target.value)}
                    placeholder="örn: 1.82 m · 78 kg (L Beden)"
                    className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Puan
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value={5}>★★★★★ (5 Yıldız - Kusursuz)</option>
                    <option value={4}>★★★★☆ (4 Yıldız - Çok İyi)</option>
                    <option value={3}>★★★☆☆ (3 Yıldız - Ortalama)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Yorumunuz
                </label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Kumaş tokluğu, kalıp ve döküm hakkındaki görüşlerinizi yazın..."
                  className="mt-1 w-full border border-white/20 bg-black px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-zinc-200 transition-colors"
              >
                Yorumu Yayınla
              </button>
            </form>
          )}

          {/* Yorumlar Listesi */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="border border-white/10 bg-zinc-950 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-white">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-400 font-mono">
                        ✓ Onaylı Alıcı
                      </span>
                    )}
                  </div>
                  <span className="text-yellow-400 text-xs">{"★".repeat(rev.rating)}</span>
                </div>

                {rev.userStats && (
                  <p className="text-[11px] font-mono text-zinc-500">{rev.userStats}</p>
                )}

                <p className="text-xs text-zinc-400 leading-relaxed">{rev.comment}</p>
                <p className="text-[10px] text-zinc-600 font-mono">{rev.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
