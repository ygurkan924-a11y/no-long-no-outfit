"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/CartContext";

const FAQS = [
  {
    q: "Kargom ne zaman kargoya verilir ve teslim edilir?",
    a: "Hafta içi saat 14:00'e kadar verilen tüm siparişler aynı gün kargoya teslim edilir. İstanbul içi genellikle ertesi gün, diğer tüm iller ise 1 ila 3 iş günü içerisinde adresinize teslim edilmektedir.",
  },
  {
    q: "Ücretsiz kargo sınırı nedir?",
    a: "1500 TL ve üzeri tüm siparişlerde kargo tamamen ücretsizdir. 1500 TL altındaki siparişler için standart kargo bedeli 59 TL'dir.",
  },
  {
    q: "Beden değişimi veya iade süreci nasıl işler?",
    a: "Siparişinizi teslim aldığınız tarihten itibaren 14 gün içerisinde koşulsuz ve ücretsiz beden değişimi veya iade talep edebilirsiniz. Ürünün etiketinin koparılmamış ve kullanılmamış olması gerekmektedir.",
  },
  {
    q: "Ürünlerinizin kalıpları nasıldır? Hangi bedeni seçmeliyim?",
    a: "Koleksiyonumuzdaki tüm parçalar kutu kesim (Boxy fit) ve dökümlü oversize olarak tasarlanmıştır. Kendi standart bedeninizi aldığınızda üzerinizde bol ve tok bir sokak duruşu sergiler. Detaylı ölçüler için sitemizdeki Akıllı Beden Sihirbazı'nı kullanabilirsiniz.",
  },
  {
    q: "Kumaşlarınız yıkamada çeker mi ya da renk solması yapar mı?",
    a: "Hayır. Tüm kumaşlarımız sanforize terbiye sürecinden geçmiş %100 kompakt pamuk ipliklerden üretilir. 30 derecede ve tersten yıkandığı sürece formunu ve rengini yıllarca korur.",
  },
  {
    q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    a: "Tüm kredi ve banka kartlarıyla 256-Bit SSL güvenli ödeme, kapıda nakit/kredi kartı ile ödeme ve Havale/EFT yöntemleriyle sipariş verebilirsiniz.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
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
            <button onClick={openCart} className="relative transition-opacity hover:opacity-70">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" />
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

      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Sıkça Sorulan Sorular</span>
        </nav>

        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Sıkça Sorulan Sorular
        </h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-zinc-400">
          Sipariş, kargo, kalıp ve iade süreçleri hakkında merak edilenler.
        </p>

        {/* Akordeon */}
        <div className="mt-12 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="border border-white/10 bg-zinc-950 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-white pr-4">
                    {faq.q}
                  </span>
                  <span className="text-lg font-light text-zinc-400">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 p-6 pt-4 text-xs leading-relaxed text-zinc-400">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 border border-white/10 bg-zinc-950 p-8 text-center space-y-3">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white">Başka Bir Sorunuz mu Var?</h2>
          <p className="text-xs text-zinc-400">Destek ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
          <div className="pt-3">
            <Link
              href="/contact"
              className="inline-block bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-zinc-200 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

