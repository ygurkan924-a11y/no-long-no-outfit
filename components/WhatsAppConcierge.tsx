"use client";

export default function WhatsAppConcierge() {
  const whatsappUrl =
    "https://wa.me/905320000000?text=Merhaba,%20NO%20LONG%20NO%20OUTFIT%20beden,%20kuma%C5%9F%20ve%20kombin%20dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1%20almak%20istiyorum.";

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp VIP Stil Danışmanı"
        className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-zinc-950/90 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
      >
        <div className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </div>

        {/* WhatsApp Minimal İkonu */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>

        <span className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all">
          VIP Stil Danışmanı
        </span>
      </a>
    </div>
  );
}

