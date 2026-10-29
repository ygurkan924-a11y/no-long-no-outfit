"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useCurrency } from "./CurrencyContext";
import { PRODUCTS, CATEGORIES, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";
import QuickViewModal from "@/components/QuickViewModal";
import GarmentVisual from "@/components/GarmentVisual";
import OutfitBuilder from "@/components/OutfitBuilder";
import DropCountdown from "@/components/DropCountdown";
import CommunityGallery from "@/components/CommunityGallery";

/* ---------- Menü Linkleri ---------- */

const NAV_LINKS = [
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Yeni Gelenler", href: "#urunler" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Kombin Stüdyosu", href: "#outfit-builder" },
  { label: "Drop 02", href: "#drop02" },
  { label: "Topluluk", href: "#community" },
  { label: "Marka", href: "#marka" },
];

const MARQUEE_ITEMS = [
  "NO LONG NO OUTFIT",
  "OVERSIZE FIT",
  "280-450 GSM HEAVYWEIGHT",
  "SANFORIZED COTTON",
  "PREMIUM STREETWEAR",
  "SINIRLI KOLEKSİYON",
];

const LOOKBOOK_ITEMS = [
  {
    look: "LOOK 01",
    title: "THE RAW BOXY SILHOUETTE",
    desc: "280 GSM kompakt penye, kutu kesim döküm ve temiz hatlar.",
    tag: "NLNO 01 Boxy Tee",
    productId: 1,
    tone: "from-zinc-900 via-neutral-900 to-black",
    garmentColor: "#18181b",
    isHoodie: false,
    hotspots: [
      {
        name: "NLNO 01 Boxy Tee",
        sub: "280 GSM · Boxy Fit",
        price: 899,
        productId: 1,
        colorHex: "#18181b",
        top: "38%",
        left: "48%",
      },
    ],
  },
  {
    look: "LOOK 02",
    title: "SHADOW LAYERING",
    desc: "420 GSM ağır metal fermuarlı zip hoodie ve asit yıkama parça uyumu.",
    tag: "NLNO 05 Zip Hoodie",
    productId: 5,
    tone: "from-neutral-950 via-zinc-900 to-black",
    garmentColor: "#27272a",
    isHoodie: true,
    hotspots: [
      {
        name: "NLNO 05 Heavy Zip Hoodie",
        sub: "420 GSM · Boxy Zip",
        price: 1899,
        productId: 5,
        colorHex: "#27272a",
        top: "40%",
        left: "52%",
      },
    ],
  },
  {
    look: "LOOK 03",
    title: "HEAVY MONOCHROME",
    desc: "450 GSM şardonlu tok dik kapüşon. Sokağın sessiz zırhı.",
    tag: "NLNO 02 Heavy Hoodie",
    productId: 2,
    tone: "from-zinc-950 via-stone-900 to-black",
    garmentColor: "#09090b",
    isHoodie: true,
    hotspots: [
      {
        name: "NLNO 02 Heavy Hoodie",
        sub: "450 GSM · Double Hood",
        price: 1699,
        productId: 2,
        colorHex: "#09090b",
        top: "38%",
        left: "50%",
      },
    ],
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

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

const SearchIcon = () => (
  <svg {...iconProps}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
const UserIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
);
const BagIcon = () => (
  <svg {...iconProps}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
);
const HeartIcon = () => (
  <svg {...iconProps}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeLookHotspot, setActiveLookHotspot] = useState<number | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalCount, openCart, addItem } = useCart();
  const { totalWishlistCount } = useWishlist();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Filtreleme ve Sıralama
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fit.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-fade-up { animation: fadeUp 0.8s ease-out both; }
        .animate-slow-zoom { animation: slowZoom 18s ease-in-out infinite alternate; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Beden Rehberi Modalı */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Hızlı İnceleme Modalı */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Üst duyuru çubuğu */}
      <div className="bg-white py-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-black">
        Ücretsiz Kargo · {formatPrice(1500)} ve Üzeri Siparişlerde
      </div>

      {/* Üst menü */}
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? "border-white/10 bg-black/90 backdrop-blur-md" : "border-transparent bg-black"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Mobil menü butonu */}
          <button
            className="flex h-10 w-10 flex-col items-start justify-center gap-[5px] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span className={`h-px w-6 bg-white transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-sm font-black uppercase leading-none tracking-[0.3em] sm:text-base md:order-first">
            NO LONG
            <br />
            NO OUTFIT
          </Link>

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              Beden Rehberi
            </button>
          </nav>

          {/* Simgeler & Para Birimi */}
          <div className="flex items-center gap-3 sm:gap-5">
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

            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) setSearchQuery("");
              }}
              aria-label="Ara"
              className={`transition-opacity hover:opacity-70 ${searchOpen ? "text-zinc-400" : ""}`}
            >
              <SearchIcon />
            </button>

            {/* İstek Listesi / Favoriler Linki */}
            <Link href="/wishlist" aria-label="Favorilerim" className="relative transition-opacity hover:opacity-70">
              <HeartIcon />
              {totalWishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Hesabım Linki */}
            <Link href="/account" aria-label="Hesabım" className="hidden transition-opacity hover:opacity-70 sm:block">
              <UserIcon />
            </Link>

            {/* Sepet Çekmecesi Butonu */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Sepeti Aç"
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

        {/* Arama alanı */}
        <div className={`overflow-hidden border-t border-white/10 transition-all duration-300 ${searchOpen ? "max-h-24 bg-zinc-950" : "max-h-0 border-transparent"}`}>
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 sm:px-8">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün veya kalıp ara... (örn: Tee, Hoodie, Sweatshirt, Boxy)"
              className="flex-1 border-b border-white/30 bg-transparent py-2 text-sm uppercase tracking-widest text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
              >
                Temizle
              </button>
            )}
          </div>
        </div>

        {/* Mobil menü paneli */}
        <div className={`overflow-hidden border-t border-white/10 bg-black transition-all duration-300 md:hidden ${menuOpen ? "max-h-96" : "max-h-0 border-transparent"}`}>
          <nav className="flex flex-col px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] flex items-center justify-between"
            >
              <span>Favorilerim</span>
              {totalWishlistCount > 0 && <span className="text-zinc-400">({totalWishlistCount})</span>}
            </Link>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em]"
            >
              Hesabım & Sipariş Takibi
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                setSizeGuideOpen(true);
              }}
              className="border-b border-white/10 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400"
            >
              Beden Rehberi
            </button>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">Para Birimi</span>
              <div className="flex gap-2">
                {(["TRY", "USD", "EUR"] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setMenuOpen(false);
                    }}
                    className={`px-3 py-1 text-[11px] font-mono font-bold border ${
                      currency === curr
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-zinc-400 hover:border-white hover:text-white"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Bölümü */}
        <section className="relative flex min-h-[85vh] items-end overflow-hidden">
          <div className="animate-slow-zoom absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#3f3f46_0%,#18181b_45%,#000000_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.4em] text-zinc-400" style={{ animationDelay: "0.1s" }}>
              Sonbahar / Kış 2026 — Drop 01
            </p>
            <h1
              className="animate-fade-up mt-4 text-6xl font-black uppercase leading-[0.9] tracking-tighter sm:text-8xl lg:text-9xl"
              style={{ animationDelay: "0.3s" }}
            >
              No Long
              <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_white]">No Outfit</span>
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base" style={{ animationDelay: "0.5s" }}>
              Oversize kesimler, 280-450 GSM ağır gramajlı kumaşlar ve sokağın sessiz gücü. Yeni sezon parçaları yayında.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.7s" }}>
              <a
                href="#urunler"
                className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
              >
                Alışverişe Başla
              </a>
              <a
                href="#lookbook"
                className="border border-white/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Lookbook
              </a>
            </div>
          </div>
        </section>

        {/* Kayan yazı bandı */}
        <div className="overflow-hidden border-y border-white/10 bg-zinc-950 py-4">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mx-8 text-sm font-bold uppercase tracking-[0.35em] text-zinc-500">
                {item} <span className="ml-8 text-white">✕</span>
              </span>
            ))}
          </div>
        </div>

        {/* Koleksiyonlar */}
        <section id="koleksiyonlar" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Kategoriler</span>
                <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter sm:text-5xl">Koleksiyonlar</h2>
              </div>
              <span className="hidden text-xs uppercase tracking-[0.3em] text-zinc-500 sm:block">03 Kategori</span>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 120}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    const el = document.getElementById("urunler");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative flex aspect-[4/5] w-full text-left items-end overflow-hidden bg-gradient-to-br ${cat.tone}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:opacity-20">
                    <span className="select-none text-[10rem] font-black leading-none">0{i + 1}</span>
                  </div>
                  <div className="absolute inset-0 border border-white/10 transition-colors group-hover:border-white/40" />
                  <div className="relative w-full p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{cat.count}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{cat.name}</h3>
                      <span className="translate-x-0 text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Yeni gelenler / Ürünler */}
        <section id="urunler" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-5xl">
                  {selectedCategory ? selectedCategory : "Yeni Gelenler"}
                </h2>
                {searchQuery && (
                  <p className="mt-2 text-xs uppercase tracking-widest text-zinc-400">
                    &quot;{searchQuery}&quot; için arama sonuçları ({filteredProducts.length} ürün)
                  </p>
                )}
              </div>

              {/* Filtre ve Sıralama Çubuğu */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`border px-4 py-2 transition-colors ${
                      selectedCategory === null
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-zinc-400 hover:border-white hover:text-white"
                    }`}
                  >
                    Tümü ({PRODUCTS.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                      className={`border px-4 py-2 transition-colors ${
                        selectedCategory === cat.name
                          ? "border-white bg-white text-black"
                          : "border-white/20 text-zinc-400 hover:border-white hover:text-white"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")}
                  className="border border-white/20 bg-black px-3 py-2 text-xs uppercase tracking-wider text-zinc-300 focus:border-white focus:outline-none"
                >
                  <option value="featured">Öne Çıkanlar</option>
                  <option value="price-asc">Fiyat: Artan</option>
                  <option value="price-desc">Fiyat: Azalan</option>
                </select>
              </div>
            </div>
          </Reveal>

          {/* Boş Arama Durumu */}
          {filteredProducts.length === 0 ? (
            <div className="border border-white/10 bg-zinc-950 p-16 text-center">
              <p className="text-base uppercase tracking-widest text-zinc-400">
                Aramanızla veya seçilen filtreyle eşleşen ürün bulunamadı.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-6 border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white hover:text-black"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* FW26 LOOKBOOK & STYLING EDITORIAL BÖLÜMÜ */}
        <section id="lookbook" className="scroll-mt-20 border-t border-white/10 bg-zinc-950 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    EDİTORYAL VİTRİN
                  </span>
                  <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-5xl">
                    FW26 Street Lookbook
                  </h2>
                </div>
                <p className="mt-3 max-w-md text-xs text-zinc-400 md:mt-0 uppercase tracking-widest leading-relaxed">
                  Katmanlı giyim, kutu kesimler ve sokak silüetleri. Kombinleri tek tıkla keşfedin.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {LOOKBOOK_ITEMS.map((item, idx) => (
                <Reveal key={item.look} delay={idx * 150}>
                  <div className={`group relative flex aspect-[3/4] flex-col justify-between overflow-hidden bg-gradient-to-br ${item.tone} p-6 sm:p-7 border border-white/10 transition-all hover:border-white/40`}>
                    {/* Üst Başlık & Etiket */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400">
                        {item.look}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest border border-white/20 bg-black/40 px-2.5 py-0.5 text-zinc-300">
                        SHOP THE LOOK
                      </span>
                    </div>

                    {/* Giysi & İnteraktif Hotspot Alanı */}
                    <div className="relative my-auto flex h-48 sm:h-56 w-full items-center justify-center">
                      <GarmentVisual
                        color={item.garmentColor}
                        isHoodie={item.isHoodie}
                        scale={0.9}
                      />

                      {/* Hotspot Noktaları */}
                      {item.hotspots.map((spot) => {
                        const isOpen = activeLookHotspot === spot.productId;
                        return (
                          <div
                            key={spot.productId}
                            className="absolute z-20"
                            style={{ top: spot.top, left: spot.left }}
                          >
                            <button
                              type="button"
                              onClick={() => setActiveLookHotspot(isOpen ? null : spot.productId)}
                              aria-label={`Hotspot: ${spot.name}`}
                              className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-black font-black text-xs shadow-xl transition-transform hover:scale-110 active:scale-95"
                            >
                              <span className="absolute -inset-1.5 animate-ping rounded-full bg-white/40" />
                              <span className="relative">{isOpen ? "✕" : "+"}</span>
                            </button>

                            {/* İnteraktif Popover / Ürün Kartı */}
                            {isOpen && (
                              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-30 w-52 rounded border border-white/20 bg-black/95 p-3 shadow-2xl backdrop-blur-md animate-fade-in text-left">
                                <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                                  {spot.sub}
                                </p>
                                <p className="mt-0.5 text-xs font-black uppercase tracking-wide text-white truncate">
                                  {spot.name}
                                </p>
                                <p className="mt-1 text-xs font-bold text-zinc-200">
                                  {formatPrice(spot.price)}
                                </p>
                                <div className="mt-2.5 flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      addItem({
                                        productId: spot.productId,
                                        name: spot.name,
                                        price: spot.price,
                                        size: "M",
                                        colorName: "Siyah",
                                        colorHex: spot.colorHex,
                                      });
                                      openCart();
                                    }}
                                    className="flex-1 bg-white py-1 text-center text-[10px] font-bold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors"
                                  >
                                    Sepete Ekle
                                  </button>
                                  <Link
                                    href={`/products/${spot.productId}`}
                                    className="border border-white/30 px-2 py-1 text-[10px] uppercase font-bold text-white hover:border-white transition-colors"
                                  >
                                    İncele
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Alt Look Bilgileri */}
                    <div className="relative z-10 space-y-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-4">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/products/${item.productId}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300"
                        >
                          <span>{item.tag}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* İnteraktif Kombin Stüdyosu (Mix & Match) */}
        <OutfitBuilder />

        {/* Sınırlı Drop 02 Geri Sayım & Erken Erişim Vault */}
        <DropCountdown />

        {/* #WornByNLNO Topluluk Galerisi */}
        <CommunityGallery />

        {/* Marka / Değerler Bölümü */}
        <section id="marka" className="scroll-mt-20 border-y border-white/10 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-2 md:items-center">
            <Reveal>
              <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl">
                Sade.
                <br />
                Ağır.
                <br />
                <span className="text-zinc-500">Kusursuz.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                NO LONG NO OUTFIT, gereksiz detayları bırakıp duruşa odaklanan bir streetwear markasıdır. Her parça; oversize kalıp,
                yüksek gramajlı kumaş ve temiz işçilikle tasarlanır. Az ama etkili.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center">
                {[
                  ["%100", "Pamuk"],
                  ["280-450", "GSM Kumaş"],
                  ["Boxy", "Oversize"],
                ].map(([big, small]) => (
                  <div key={small}>
                    <p className="text-xl font-black sm:text-2xl">{big}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-zinc-500">{small}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Bülten */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl">Drop&apos;lardan İlk Sen Haberdar Ol</h2>
            <p className="mt-4 text-sm text-zinc-400">Yeni koleksiyonlar ve özel ön satışlar için listemize katıl.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="E-posta adresin"
                className="flex-1 border border-white/20 bg-transparent px-5 py-4 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
              />
              <button type="submit" className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300">
                Katıl
              </button>
            </form>
          </Reveal>
        </section>
      </main>

      {/* Alt bilgi */}
      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-black uppercase leading-tight tracking-[0.3em]">
              NO LONG
              <br />
              NO OUTFIT
            </p>
            <p className="mt-4 max-w-xs text-sm text-zinc-500">Premium streetwear. Sade, oversize ve sınırlı sayıda.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em]">Alışveriş</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              <li><a href="#urunler" className="transition-colors hover:text-white">Oversize Tişört</a></li>
              <li><a href="#urunler" className="transition-colors hover:text-white">Hoodie</a></li>
              <li><a href="#urunler" className="transition-colors hover:text-white">Sweatshirt</a></li>
              <li><Link href="/wishlist" className="transition-colors hover:text-white">İstek Listem</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em]">Hesap & Destek</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              <li><Link href="/account" className="transition-colors hover:text-white">Sipariş Takibi & Giriş</Link></li>
              <li>
                <button onClick={() => setSizeGuideOpen(true)} className="transition-colors hover:text-white">
                  Beden Rehberi
                </button>
              </li>
              <li><Link href="/care-guide" className="transition-colors hover:text-white">Kumaş & Yıkama Rehberi</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">Sıkça Sorulan Sorular (SSS)</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">İletişim & Müşteri Hizmetleri</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
          © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
