export type ColorOption = {
  name: string;
  hex: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  userStats?: string; // örn: "1.82 m · 78 kg (L Beden)"
  verified: boolean;
};

export type Product = {
  id: number;
  name: string;
  category: "Oversize Tişört" | "Hoodie" | "Sweatshirt" | "Alt Giyim";
  price: number;
  badge?: "YENİ" | "SINIRLI SAYIDA" | "SON PARÇALAR";
  tone: string;
  garment: string;
  gsm: string; // Kumaş ağırlığı (lüks streetwear için temel ölçüt)
  fit: string; // Kalıp bilgisi
  description: string;
  details: string[];
  colors: ColorOption[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  complementaryIds: number[]; // Kombin önerileri
};

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORIES = [
  { name: "Oversize Tişört", count: "8 Parça", tone: "from-zinc-900 to-black" },
  { name: "Hoodie", count: "6 Parça", tone: "from-zinc-800 to-zinc-950" },
  { name: "Sweatshirt", count: "4 Parça", tone: "from-neutral-900 to-black" },
  { name: "Alt Giyim", count: "2 Parça", tone: "from-zinc-950 to-neutral-900" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NLNO 01 — Heavyweight Boxy Tee",
    category: "Oversize Tişört",
    price: 849,
    badge: "YENİ",
    tone: "from-zinc-900 to-black",
    garment: "#e5e5e5",
    gsm: "280 GSM Ağır Süprem",
    fit: "Boxy Oversize",
    description:
      "Düşük omuz dikişleri, tok düşen kalın yakası ve kutu kesimiyle kusursuz bir silüet. Ağır gramajlı kompakt pamuk dokusu, defalarca yıkansa dahi formunu kaybetmez.",
    details: [
      "%100 taranmış kompakt pamuk, 280 GSM",
      "Kutu kesim (Boxy fit) dökümlü gövde",
      "3 cm kalın ribana çift dikişli yaka",
      "Çekme yapmaz sanforize terbiye",
    ],
    colors: [
      { name: "Kırık Beyaz", hex: "#e5e5e5" },
      { name: "Mat Siyah", hex: "#171717" },
      { name: "Füme Antrasit", hex: "#3f3f46" },
    ],
    rating: 4.9,
    reviewCount: 38,
    complementaryIds: [2, 3, 5],
    reviews: [
      {
        id: "r1",
        author: "Caner K.",
        rating: 5,
        date: "22 Ekim 2026",
        userStats: "1.82 m · 79 kg (L Beden)",
        comment: "Kumaşın tokluğu ve ağırlığı gerçekten üst segment markalar seviyesinde. Yaka kısmı sarkmıyor ve omuz dökümü tam istediğim gibi.",
        verified: true,
      },
      {
        id: "r2",
        author: "Mert T.",
        rating: 5,
        date: "18 Ekim 2026",
        userStats: "1.76 m · 71 kg (M Beden)",
        comment: "Normalde tişörtlerde aradığım kalınlığı bulamıyordum, 280 GSM süprem mükemmel tok duruyor. 30 derecede yıkadım gram çekme yapmadı.",
        verified: true,
      },
    ],
  },
  {
    id: 2,
    name: "NLNO 02 — Structured Heavy Hoodie",
    category: "Hoodie",
    price: 2199,
    badge: "YENİ",
    tone: "from-zinc-800 to-black",
    garment: "#171717",
    gsm: "450 GSM Ağır Şardonlu",
    fit: "Drop-Shoulder Döküm",
    description:
      "Ultra ağır 450 GSM içi şardonlu pamuk kumaş. Kordonsuz, başın arkasında dik ve tok duran çift katlı kapüşon. Sokak stilinin en güçlü ve dayanıklı temel parçası.",
    details: [
      "%100 pamuk 3 iplik, 450 GSM",
      "Kordonsuz minimalist çift kat dik kapüşon",
      "Düşük omuzlu geniş kalıp",
      "Gizli dikişli kanguru cep",
    ],
    colors: [
      { name: "Mat Siyah", hex: "#171717" },
      { name: "Koyu Grafit", hex: "#27272a" },
    ],
    rating: 5.0,
    reviewCount: 42,
    complementaryIds: [1, 4, 7],
    reviews: [
      {
        id: "r3",
        author: "Deniz Y.",
        rating: 5,
        date: "20 Ekim 2026",
        userStats: "1.85 m · 84 kg (XL Beden)",
        comment: "Kapüşonun tok duruşu inanılmaz. Kordonsuz olması çok temiz ve lüks bir hava katmış. Gerçek bir zırh gibi ağır ve sıcak.",
        verified: true,
      },
    ],
  },
  {
    id: 3,
    name: "NLNO 03 — Washed Charcoal Crewneck",
    category: "Sweatshirt",
    price: 1599,
    tone: "from-neutral-900 to-black",
    garment: "#38383a",
    gsm: "380 GSM Şardonsuz Tok Örgü",
    fit: "Boxy Cut",
    description:
      "Özel pigment yıkama ile elde edilmiş derin antrasit tonu. İçi şardonsuz, tok örgü 380 GSM yapısıyla dört mevsim dökümlü bir giyim deneyimi sunar.",
    details: [
      "380 GSM tok örgü şardonsuz pamuk",
      "Pigment asit yıkamalı vintage efekt",
      "Geniş omuz ve rahat kol kesimi",
      "Yüksek elastanlı ribanalı bilek ve bel manşeti",
    ],
    colors: [
      { name: "Yıkanmış Füme", hex: "#38383a" },
      { name: "Zift Siyah", hex: "#121212" },
    ],
    rating: 4.8,
    reviewCount: 26,
    complementaryIds: [1, 5, 8],
    reviews: [
      {
        id: "r4",
        author: "Burak S.",
        rating: 5,
        date: "15 Ekim 2026",
        userStats: "1.79 m · 75 kg (M Beden)",
        comment: "Füme asit tonu fotoğraftakinden bile daha güzel. Dikiş işçiliği çok kaliteli.",
        verified: true,
      },
    ],
  },
  {
    id: 4,
    name: "NLNO 04 — Minimal Graphic Tee",
    category: "Oversize Tişört",
    price: 899,
    badge: "SINIRLI SAYIDA",
    tone: "from-zinc-900 to-zinc-950",
    garment: "#f5f5f5",
    gsm: "280 GSM Süprem",
    fit: "Oversize Fit",
    description:
      "Sırtta tonal gri tonlarında soyut tipografik NLNO kimliği. Göğüste mikron hassasiyetinde silikon logo detayı. Sade, abartısız ama anında fark edilen lüks doku.",
    details: [
      "%100 organik kompakt penye pamuk",
      "Kabartmalı mikro silikon göğüs detayı",
      "Yıkamada çıkmayan nefes alabilir sırt tipografisi",
      "Düşük omuz ve dökümlü gövde",
    ],
    colors: [
      { name: "Tebeşir Beyaz", hex: "#f5f5f5" },
      { name: "Mat Siyah", hex: "#171717" },
    ],
    rating: 4.9,
    reviewCount: 19,
    complementaryIds: [2, 5, 6],
    reviews: [
      {
        id: "r5",
        author: "Alp K.",
        rating: 5,
        date: "12 Ekim 2026",
        userStats: "1.81 m · 76 kg (L Beden)",
        comment: "Arka baskı kumaşa yedirilmiş, plastik hissi yok. Çok temiz bir tasarım.",
        verified: true,
      },
    ],
  },
  {
    id: 5,
    name: "NLNO 05 — Raw Hem Zip Hoodie",
    category: "Hoodie",
    price: 2399,
    tone: "from-zinc-900 to-neutral-950",
    garment: "#27272a",
    gsm: "420 GSM 3 İplik",
    fit: "Boxy Tactical",
    description:
      "Çift yönlü mat gümüş metal fermuar. Katmanlı giyimde tişörtlerin üzerine kusursuz oturan geniş göğüs ve düşük omuz kalıbı.",
    details: [
      "Özel mat nikel çift yönlü fermuar",
      "420 GSM ağır gramajlı saf pamuk doku",
      "Kollarda güçlendirilmiş çift dikiş paneli",
      "Geniş yan dikiş cepleri",
    ],
    colors: [
      { name: "Koyu Grafit", hex: "#27272a" },
      { name: "Ham Siyah", hex: "#101010" },
    ],
    rating: 5.0,
    reviewCount: 31,
    complementaryIds: [1, 7, 3],
    reviews: [
      {
        id: "r6",
        author: "Tolga A.",
        rating: 5,
        date: "19 Ekim 2026",
        userStats: "1.88 m · 90 kg (XL Beden)",
        comment: "Çift yönlü fermuar katmanlı giyimde çok şık duruyor. Fermuarı açıp alttan tişörtü göstermek tam sokak stili.",
        verified: true,
      },
    ],
  },
  {
    id: 6,
    name: "NLNO 06 — Essential Drop Sweatshirt",
    category: "Sweatshirt",
    price: 1499,
    badge: "SON PARÇALAR",
    tone: "from-neutral-800 to-black",
    garment: "#d4d4d8",
    gsm: "380 GSM",
    fit: "Rahat Kalıp",
    description:
      "Gereksiz hiçbir çizgi içermeyen, sadece kumaş kalitesi ve kalıp dengesiyle konuşan zamansız sweatshirt. Temiz dikişler ve pürüzsüz tuşe.",
    details: [
      "%100 taranmış pamuk, 380 GSM",
      "Ribanalı bisiklet yaka",
      "Sanforize çekmezlik garantisi",
      "Aşınmaya dayanıklı manşetler",
    ],
    colors: [
      { name: "Melanj Açık Gri", hex: "#d4d4d8" },
      { name: "Kömür Siyahı", hex: "#171717" },
    ],
    rating: 4.7,
    reviewCount: 15,
    complementaryIds: [1, 2, 8],
    reviews: [
      {
        id: "r7",
        author: "Kaan V.",
        rating: 5,
        date: "10 Ekim 2026",
        userStats: "1.74 m · 68 kg (S Beden)",
        comment: "Kalıp tam oturdu. Rengi fotoğraftaki gibi asil bir melanj açık gri.",
        verified: true,
      },
    ],
  },
  {
    id: 7,
    name: "NLNO 07 — Acid Washed Heavy Tee",
    category: "Oversize Tişört",
    price: 799,
    tone: "from-zinc-800 to-black",
    garment: "#52525b",
    gsm: "260 GSM Yıkamalı Penye",
    fit: "Vintage Boxy",
    description:
      "Yumuşatılmış özel yıkama işlemiyle elde edilmiş soluk gri doku. Her tişörtün renk geçişi kendine özgüdür.",
    details: [
      "260 GSM dokulu pamuk penye",
      "Eskitilmiş vintage dikiş detayları",
      "30 derecede hassas yıkama",
      "Geniş kol ağzı payı",
    ],
    colors: [
      { name: "Asit Grisi", hex: "#52525b" },
      { name: "Asfalt Karası", hex: "#27272a" },
    ],
    rating: 4.9,
    reviewCount: 22,
    complementaryIds: [2, 5, 3],
    reviews: [
      {
        id: "r8",
        author: "Emre E.",
        rating: 5,
        date: "14 Ekim 2026",
        userStats: "1.80 m · 77 kg (L Beden)",
        comment: "Yıkaması ve eskitme efekti çok başarılı. Cole Buxton hissiyatı veriyor.",
        verified: true,
      },
    ],
  },
  {
    id: 8,
    name: "NLNO 08 — Oversize Fleece Hoodie",
    category: "Hoodie",
    price: 1999,
    tone: "from-zinc-900 to-zinc-950",
    garment: "#fafafa",
    gsm: "400 GSM Şardonlu",
    fit: "Oversize",
    description:
      "Beyazın en saf tonunda, tok duruşlu ağır hoodie. Minimalist gardıropların en rafine anahtar parçası.",
    details: [
      "%100 pamuk 400 GSM",
      "Çift katmanlı dik duran kapüşon",
      "Geniş kanguru cep",
      "Kollarda güçlendirilmiş ribana",
    ],
    colors: [
      { name: "Optik Beyaz", hex: "#fafafa" },
      { name: "Karanlık Siyah", hex: "#171717" },
    ],
    rating: 4.8,
    reviewCount: 17,
    complementaryIds: [1, 3, 7],
    reviews: [
      {
        id: "r9",
        author: "Serhat D.",
        rating: 5,
        date: "08 Ekim 2026",
        userStats: "1.83 m · 80 kg (L Beden)",
        comment: "Tertemiz bir beyaz, içi yumuşacık şardonlu ve inanılmaz sıcak tutuyor.",
        verified: true,
      },
    ],
  },
  {
    id: 9,
    name: "NLNO 09 — Heavy Wide-Leg Sweatpants",
    category: "Alt Giyim",
    price: 1399,
    badge: "YENİ",
    tone: "from-zinc-950 to-neutral-900",
    garment: "#18181b",
    gsm: "400 GSM Şardonlu Pamuk",
    fit: "Wide-Leg Dökümlü",
    description:
      "Ayakkabının üzerine dökülen paça yapısı, gizli iç bağcık ve derin cepler. Üst parçalarla silüet bütünlüğü oluşturan ağır gramajlı rahatlık.",
    details: [
      "%100 taranmış pamuk 3 iplik, 400 GSM",
      "Geniş paça (Wide-leg) kutu döküm",
      "Kalın elastik bel bandı ve iç kordon",
      "Gizli dikişli derin yan cepler",
    ],
    colors: [
      { name: "Mat Siyah", hex: "#18181b" },
      { name: "Yıkanmış Füme", hex: "#3f3f46" },
    ],
    rating: 4.9,
    reviewCount: 24,
    complementaryIds: [1, 2, 5],
    reviews: [
      {
        id: "r10",
        author: "Mert C.",
        rating: 5,
        date: "25 Ekim 2026",
        userStats: "1.84 m · 81 kg (L Beden)",
        comment: "Paçaların sneaker üzerine dökümü kusursuz. Kumaş kalın ve kesinlikle diz yapmıyor.",
        verified: true,
      },
    ],
  },
  {
    id: 10,
    name: "NLNO 10 — Raw Tactical Utility Cargo",
    category: "Alt Giyim",
    price: 1699,
    badge: "SINIRLI SAYIDA",
    tone: "from-neutral-900 to-black",
    garment: "#27272a",
    gsm: "360 GSM Ağır Kanvas",
    fit: "Relaxed Boxy Cargo",
    description:
      "Ağır yıkamalı ham pamuk kanvas kumaş. Geometrik körüklü kargo cepleri ve mat nikel detaylar. Modern sokak zırhı.",
    details: [
      "%100 ham pamuk ağır kanvas, 360 GSM",
      "Körüklü çift kapaklı kargo cepleri",
      "Paçalarda ayarlanabilir stoperli kordon",
      "Güçlendirilmiş diz dikiş panelleri",
    ],
    colors: [
      { name: "Koyu Grafit", hex: "#27272a" },
      { name: "Asfalt Karası", hex: "#121212" },
    ],
    rating: 5.0,
    reviewCount: 31,
    complementaryIds: [1, 4, 5],
    reviews: [
      {
        id: "r11",
        author: "Volkan B.",
        rating: 5,
        date: "21 Ekim 2026",
        userStats: "1.78 m · 74 kg (M Beden)",
        comment: "Kalıp ve kumaş kalitesi inanılmaz. Ceplerin duruşu çok tok, sarkma yapmıyor.",
        verified: true,
      },
    ],
  },
];

export function getProductById(id: number | string): Product | undefined {
  const numericId = typeof id === "string" ? Number(id) : id;
  return PRODUCTS.find((p) => p.id === numericId);
}

export function getComplementaryProducts(productId: number | string): Product[] {
  const p = getProductById(productId);
  if (!p || !p.complementaryIds) {
    return PRODUCTS.filter((item) => item.id !== Number(productId)).slice(0, 3);
  }
  return PRODUCTS.filter((item) => p.complementaryIds.includes(item.id));
}
