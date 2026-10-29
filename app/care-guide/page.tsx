"use client";

import Link from "next/link";
import { useCart } from "@/app/CartContext";

export default function CareGuidePage() {
  const { totalCount, openCart } = useCart();

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
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
            <button
              onClick={openCart}
              aria-label="Sepet"
              className="relative transition-opacity hover:opacity-70"
            >
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

      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-20">
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Kumaş & Yıkama Bakım Rehberi</span>
        </nav>

        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Kumaş & Bakım Rehberi
        </h1>
        <p className="mt-4 text-sm text-zinc-400 uppercase tracking-widest max-w-xl leading-relaxed">
          280 — 450 GSM ağır gramajlı pamuk parçalarınızı ömür boyu ilk günkü dökümüyle korumak için hazırladığımız özel bakım tüyoları.
        </p>

        <div className="mt-12 space-y-10">
          {/* Adım 1 */}
          <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              KURAL 01
            </span>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
              30°C Sıcaklıkta ve Tersten Yıkama
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Ağır gramajlı kumaşlarımızın lif bütünlüğünü ve derin pigment renk tonlarını korumak için her zaman <strong className="text-white">maksimum 30 derecede</strong>, giysinizi tersine çevirerek yıkayın. Asla ağartıcı veya klor içeren ağır kimyasallar kullanmayın; sıvı hassas deterjanlar önerilir.
            </p>
          </section>

          {/* Adım 2 */}
          <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              KURAL 02
            </span>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
              Kurutma Makinesine Asla Atmayın
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Yüksek ısıdaki tamburlu kurutma makineleri pamuğun doğal nem dengesini ve lif elastikiyetini yok eder. Giysilerinizi yıkadıktan sonra silkeleyerek <strong className="text-white">düz bir zemine veya geniş askıya sererek</strong> doğal oda sıcaklığında kurumaya bırakın.
            </p>
          </section>

          {/* Adım 3 */}
          <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              KURAL 03
            </span>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
              Tersten ve Buharlı Ütüleme
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Baskılı ve silikon detaylı alanların zarar görmemesi için parçalarınızı her zaman <strong className="text-white">içten dışa (tersten)</strong> ve orta-düşük ısıda buhar vererek ütüleyin. Bu işlem kumaşın dökümlü tokluğunu anında geri kazandırır.
            </p>
          </section>

          {/* Adım 4 */}
          <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              KURAL 04
            </span>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
              Askı ve Muhafaza
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              450 GSM ağır hoodie ve sweatshirt modelleri ağır oldukları için ince tel askılarda omuz izi yapabilir. Kalın ahşap formlu askılar kullanın veya parçalarınızı dolabınızda düzgünce katlayarak muhafaza edin.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors"
          >
            Koleksiyonu İncele
          </Link>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

