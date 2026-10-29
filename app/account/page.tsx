"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../CartContext";
import { useCurrency } from "../CurrencyContext";

type OrderQueryResult = {
  orderId: string;
  date: string;
  status: string;
  carrier: string;
  estimatedDelivery: string;
  address: string;
  itemsCount: string;
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"track" | "login">("track");
  const [orderQuery, setOrderQuery] = useState("");
  const [queryResult, setQueryResult] = useState<OrderQueryResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Giriş Formu
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const { totalCount, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setHasSearched(true);
    // Simüle edilmiş kargo verisi
    setQueryResult({
      orderId: orderQuery.toUpperCase(),
      date: "24 Ekim 2026",
      status: "Kargoya Verildi",
      carrier: "Yurtiçi Kargo — 49201948201",
      estimatedDelivery: "2 gün içinde teslimat",
      address: "Kadıköy / İstanbul",
      itemsCount: "2 Parça",
    });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) return;
    setAuthSuccess(true);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      {/* Üst duyuru çubuğu */}
      <div className="bg-white py-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-black">
        Ücretsiz Kargo · {formatPrice(1500)} ve Üzeri Siparişlerde
      </div>

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
            <button onClick={openCart} aria-label="Sepet" className="relative transition-opacity hover:opacity-70">
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

      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
        {/* Sekmeler */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("track")}
            className={`pb-4 text-xs font-bold uppercase tracking-[0.25em] transition-all border-b-2 mr-8 ${
              activeTab === "track"
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sipariş Takibi
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`pb-4 text-xs font-bold uppercase tracking-[0.25em] transition-all border-b-2 ${
              activeTab === "login"
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Hesap Girişi
          </button>
        </div>

        {/* Tab 1: Sipariş Takibi */}
        {activeTab === "track" && (
          <div className="mt-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">Kargo & Sipariş Sorgula</h2>
            <p className="mt-2 text-xs text-zinc-400">
              Sipariş tamamlama ekranında veya onay e-postasında iletilen sipariş kodunu girin.
            </p>

            <form onSubmit={handleTrackOrder} className="mt-6 flex gap-3">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="örn: NLNO-849201"
                className="flex-1 border border-white/20 bg-zinc-950 px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-zinc-200 transition-colors"
              >
                Sorgula
              </button>
            </form>

            {hasSearched && queryResult && (
              <div className="mt-8 border border-white/10 bg-zinc-950 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      Sipariş Kodu
                    </span>
                    <p className="text-base font-black text-white">{queryResult.orderId}</p>
                  </div>
                  <span className="border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    {queryResult.status}
                  </span>
                </div>

                {/* Görsel Kargo Takip Zaman Çizelgesi */}
                <div className="py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
                    Sipariş Yolculuğu
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 relative">
                    {[
                      { step: "01", title: "Sipariş Alındı", time: "24 Eki 14:10", status: "completed" },
                      { step: "02", title: "Kalite Kontrol", time: "24 Eki 15:45", status: "completed" },
                      { step: "03", title: "Mühürlü Paket", time: "24 Eki 17:30", status: "completed" },
                      { step: "04", title: "Kargoya Verildi", time: "25 Eki 09:15", status: "current" },
                      { step: "05", title: "Teslimat", time: "Tahmini 2 Gün", status: "pending" },
                    ].map((item) => (
                      <div key={item.step} className="flex flex-col items-start sm:items-center text-left sm:text-center relative">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono font-bold transition-all mb-2 ${
                            item.status === "completed"
                              ? "bg-white text-black"
                              : item.status === "current"
                              ? "bg-white text-black ring-4 ring-white/20 animate-pulse"
                              : "border border-white/20 text-zinc-600 bg-black"
                          }`}
                        >
                          {item.status === "completed" ? "✓" : item.step}
                        </div>
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            item.status === "pending" ? "text-zinc-600" : "text-white"
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs text-zinc-400 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Kargo Firması & Takip No</p>
                    <p className="text-white mt-1 font-mono">{queryResult.carrier}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Tahmini Teslimat</p>
                    <p className="text-white mt-1">{queryResult.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Teslimat Adresi</p>
                    <p className="text-white mt-1">{queryResult.address}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Sipariş Tarihi</p>
                    <p className="text-white mt-1">{queryResult.date}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Giriş & Kayıt */}
        {activeTab === "login" && (
          <div className="mt-8 max-w-md">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              {isRegister ? "Hesap Oluştur" : "Müşteri Girişi"}
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Sipariş geçmişinize ve kayıtlı adreslerinize erişmek için giriş yapın.
            </p>

            {authSuccess ? (
              <div className="mt-6 border border-white/10 bg-zinc-950 p-6 text-center">
                <p className="text-sm font-bold text-white uppercase tracking-wider">Hoş Geldiniz</p>
                <p className="mt-1 text-xs text-zinc-400">Hesabınıza başarıyla giriş yapıldı.</p>
                <Link
                  href="/"
                  className="mt-6 inline-block bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-zinc-200"
                >
                  Alışverişe Devam Et
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAuth} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="mt-2 w-full border border-white/20 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Şifre
                  </label>
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 w-full border border-white/20 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-white py-4 text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-zinc-200 transition-colors"
                >
                  {isRegister ? "Kayıt Ol" : "Giriş Yap"}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                  >
                    {isRegister ? "Zaten hesabınız var mı? Giriş Yapın" : "Hesabınız yok mu? Yeni Hesap Oluşturun"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

