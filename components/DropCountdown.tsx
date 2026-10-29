"use client";

import { useEffect, useState } from "react";

export default function DropCountdown() {
  // 3 gün, 14 saat, 35 dakika sonraki tarih
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 35,
    seconds: 48,
  });

  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <section id="drop02" className="scroll-mt-20 border-t border-white/10 bg-zinc-950 py-20 sm:py-28 text-white relative overflow-hidden">
      {/* Arka Plan Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            <span>SINIRLI KOLEKSİYON DROP 02</span>
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl lg:text-7xl">
            Winter Vault
          </h2>
          <p className="mt-4 text-sm text-zinc-400 uppercase tracking-widest leading-relaxed">
            450 GSM termo şardonlu kumaşlar, metal aksesuarlar ve kışlık sokak zırhı. Yalnızca 250 adet numaralı üretim.
          </p>

          {/* Geri Sayım Blokları */}
          <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
            {[
              { val: String(timeLeft.days).padStart(2, "0"), label: "GÜN" },
              { val: String(timeLeft.hours).padStart(2, "0"), label: "SAAT" },
              { val: String(timeLeft.minutes).padStart(2, "0"), label: "DAKİKA" },
              { val: String(timeLeft.seconds).padStart(2, "0"), label: "SANİYE" },
            ].map((b) => (
              <div key={b.label} className="border border-white/20 bg-black/80 p-4 sm:p-6 backdrop-blur">
                <span className="text-3xl font-black sm:text-5xl font-mono text-white block">
                  {b.val}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mt-2 block">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Erken Erişim VIP Şifre Formu */}
          <div className="mt-12 max-w-md mx-auto">
            {joined ? (
              <div className="border border-white/30 bg-black p-4 text-center space-y-1">
                <p className="text-xs font-bold uppercase text-white tracking-wider">
                  ✓ VIP Erken Erişiminiz Ayrıldı
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Şifreniz: <span className="text-white font-bold">NLNO-VAULT26</span> (Satıştan 2 saat önce aktifleşir)
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta veya telefonun"
                  className="flex-1 border border-white/20 bg-black px-4 py-3.5 text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-zinc-200 transition-colors shrink-0"
                >
                  VIP Şifre Al
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Kilitli Teaser Önizleme Kartları */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="border border-white/10 bg-black/50 p-6 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">KİLİTLİ ARŞİV #01</span>
              <p className="text-sm font-bold uppercase text-zinc-300 mt-1">480 GSM Heavy Thermal Bomber</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Sadece 100 Adet Üretim</p>
            </div>
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-zinc-400">
              🔒
            </div>
          </div>

          <div className="border border-white/10 bg-black/50 p-6 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">KİLİTLİ ARŞİV #02</span>
              <p className="text-sm font-bold uppercase text-zinc-300 mt-1">Acid Raw Double Knee Work Pant</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Sadece 150 Adet Üretim</p>
            </div>
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-zinc-400">
              🔒
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

