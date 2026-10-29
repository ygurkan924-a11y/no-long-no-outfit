"use client";

import Link from "next/link";

const COMMUNITY_POSTS = [
  {
    id: 1,
    city: "Karaköy / İstanbul",
    handle: "@kerem.raw",
    stats: "1.84 m · 79 kg",
    size: "L Beden",
    productName: "NLNO 01 Boxy Tee",
    productId: 1,
    tone: "from-zinc-900 via-neutral-900 to-black",
  },
  {
    id: 2,
    city: "Kadıköy / İstanbul",
    handle: "@mert_nlno",
    stats: "1.80 m · 75 kg",
    size: "XL Beden",
    productName: "NLNO 02 Heavy Hoodie",
    productId: 2,
    tone: "from-neutral-950 via-zinc-900 to-black",
  },
  {
    id: 3,
    city: "Nişantaşı / İstanbul",
    handle: "@selin.street",
    stats: "1.74 m · 60 kg",
    size: "M Beden (Oversize)",
    productName: "NLNO 05 Zip Hoodie",
    productId: 5,
    tone: "from-zinc-950 via-stone-900 to-black",
  },
  {
    id: 4,
    city: "Mitte / Berlin",
    handle: "@lukas_k",
    stats: "1.89 m · 86 kg",
    size: "XXL Beden",
    productName: "NLNO 03 Washed Crewneck",
    productId: 3,
    tone: "from-zinc-900 via-stone-950 to-black",
  },
];

export default function CommunityGallery() {
  return (
    <section id="community" className="scroll-mt-20 border-t border-white/10 bg-black py-20 sm:py-28 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              #WornByNLNO TOPLULUĞU
            </span>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Sokağın Kendisi
            </h2>
          </div>
          <p className="mt-3 max-w-md text-xs text-zinc-400 md:mt-0 uppercase tracking-widest leading-relaxed">
            Parçalarımızı sokakta taşıyanların gerçek duruşları ve beden eşleşmeleri. Etiketi kullan, sonraki drop editoryalinde yerini al.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {COMMUNITY_POSTS.map((post) => (
            <div
              key={post.id}
              className={`group relative flex aspect-[3/4] flex-col justify-between overflow-hidden bg-gradient-to-br ${post.tone} p-5 border border-white/10 transition-all hover:border-white/40`}
            >
              {/* Şehir & Kullanıcı */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-zinc-400">
                <span>{post.city}</span>
                <span className="text-zinc-500">{post.handle}</span>
              </div>

              {/* Minimalist Sanatsal Silüet Grafiği */}
              <div className="my-auto flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-90">
                <svg viewBox="0 0 100 120" className="h-32 w-32" aria-hidden="true">
                  <circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path
                    d="M30 40 L70 40 L80 90 L65 90 L60 115 L40 115 L35 90 L20 90 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              {/* Alt Bilgi & Hover Detayı */}
              <div className="relative z-10 space-y-1 bg-gradient-to-t from-black via-black/80 to-transparent pt-4">
                <p className="text-[10px] font-mono text-zinc-400">{post.stats}</p>
                <p className="text-xs font-bold uppercase text-white truncate">{post.productName}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{post.size}</p>

                <div className="pt-2">
                  <Link
                    href={`/products/${post.productId}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300"
                  >
                    <span>Parçayı İncele</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

