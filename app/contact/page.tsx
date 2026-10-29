"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/CartContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNo: "",
    subject: "siparis",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { totalCount, openCart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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

      <main className="mx-auto max-w-5xl px-5 py-12 sm:py-20">
        <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">İletişim & Destek</span>
        </nav>

        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Bize Ulaşın
        </h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-zinc-400 max-w-md">
          Siparişiniz, beden sorularınız veya toptan işbirlikleri için bize dilediğiniz zaman yazabilirsiniz.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* İletişim Formu */}
          <div className="border border-white/10 bg-zinc-950 p-6 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <span className="text-3xl text-emerald-400">✓</span>
                <h2 className="text-2xl font-black uppercase tracking-tight">Mesajınız Alındı</h2>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Ekibimiz en geç 24 saat içerisinde belirttiğiniz e-posta adresine geri dönüş yapacaktır.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-white/30 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@example.com"
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Sipariş Numarası (Varsa)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNo}
                      onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                      placeholder="örn: NLNO-84920"
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Konu
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
                    >
                      <option value="siparis">Sipariş & Teslimat Durumu</option>
                      <option value="iade">Beden Değişimi & İade</option>
                      <option value="beden">Beden & Kalıp Danışmanlığı</option>
                      <option value="diger">Diğer / İş Birliği</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Mesajınız *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Sorunuzu veya talebinizi detaylıca iletin..."
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white py-4 text-xs font-black uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors"
                >
                  Mesajı Gönder
                </button>
              </form>
            )}
          </div>

          {/* İletişim Kanalları */}
          <div className="space-y-6">
            <div className="border border-white/10 bg-zinc-950 p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                Müşteri Hizmetleri
              </h2>
              <p className="mt-3 text-sm font-bold text-white">support@nolongnooutfit.com</p>
              <p className="mt-1 text-xs text-zinc-500">24 saat içinde yanıtlanır</p>
            </div>

            <div className="border border-white/10 bg-zinc-950 p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                WhatsApp Hızlı Destek
              </h2>
              <p className="mt-3 text-sm font-bold text-white">+90 (532) 000 00 00</p>
              <p className="mt-1 text-xs text-zinc-500">Hafta içi 09:00 — 18:00</p>
            </div>

            <div className="border border-white/10 bg-zinc-950 p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                Showroom & Stüdyo
              </h2>
              <p className="mt-3 text-sm text-white leading-relaxed">
                Moda Caddesi No: 42<br />
                Kadıköy / İstanbul
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-500">
                Randevu ile ziyaret edilebilir
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

