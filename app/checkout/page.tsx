"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, LUXURY_PACKAGING_FEE } from "../CartContext";
import { useCurrency } from "../CurrencyContext";

const FREE_SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 59;

function GarmentThumb({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-3/4 w-3/4" aria-hidden="true">
      <path
        d="M20 10 L35 4 Q50 14 65 4 L80 10 L95 28 L82 38 L76 32 L76 92 L24 92 L24 32 L18 38 L5 28 Z"
        fill={color}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export default function CheckoutPage() {
  const { items, totalCount, totalPrice, loaded, clearCart, hasLuxuryPackaging, giftNote } = useCart();
  const { formatPrice } = useCurrency();

  // Form durumları
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "door" | "bank">("card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Kargo, paketleme ve toplam hesaplama
  const packagingFee = hasLuxuryPackaging ? LUXURY_PACKAGING_FEE : 0;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_FEE;
  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const grandTotal = Math.max(totalPrice - discountAmount + shipping + packagingFee, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === "NLNO10") {
      setDiscountPercent(10);
      setCouponSuccess("%10 İndirim uygulandı!");
    } else if (couponCode.trim().toUpperCase() === "OVERSIZE") {
      setDiscountPercent(15);
      setCouponSuccess("%15 İndirim uygulandı!");
    } else {
      setCouponError("Geçersiz indirim kodu. (Deneyin: NLNO10)");
    }
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Ad Soyad gereklidir.";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Geçerli bir e-posta girin.";
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası gereklidir.";
    if (!formData.city.trim()) newErrors.city = "İl seçiniz.";
    if (!formData.district.trim()) newErrors.district = "İlçe giriniz.";
    if (!formData.address.trim()) newErrors.address = "Teslimat adresi gereklidir.";

    if (paymentMethod === "card") {
      if (!cardInfo.number.trim() || cardInfo.number.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "16 haneli kart numarasını girin.";
      }
      if (!cardInfo.holder.trim()) newErrors.cardHolder = "Kart üzerindeki isim gereklidir.";
      if (!cardInfo.expiry.trim()) newErrors.cardExpiry = "Son kullanma tarihi gereklidir.";
      if (!cardInfo.cvv.trim() || cardInfo.cvv.length < 3) newErrors.cardCvv = "Geçerli CVV girin.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    // Sipariş simülasyonu
    setTimeout(() => {
      const generatedOrderNum = `NLNO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setOrderComplete(true);
      setSubmitting(false);
      clearCart();
    }, 1200);
  };

  // Header bileşeni
  const header = (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-sm font-black uppercase leading-none tracking-[0.3em] sm:text-base">
          NO LONG
          <br />
          NO OUTFIT
        </Link>
        <Link
          href="/cart"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
        >
          ← Sepete Dön
        </Link>
      </div>
    </header>
  );

  // Sipariş Başarılı Ekranı
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black text-white antialiased">
        {header}
        <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white text-black text-3xl font-bold">
            ✓
          </div>
          <h1 className="mt-8 text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Siparişiniz Alındı
          </h1>
          <p className="mt-3 text-sm tracking-widest text-zinc-400 uppercase">
            Sipariş Kodu: <span className="font-bold text-white">{orderNumber}</span>
          </p>

          <div className="mt-10 border border-white/10 bg-zinc-950 p-6 sm:p-8 text-left space-y-4 text-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-300">Teslimat Özeti</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-zinc-400">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">Alıcı</p>
                <p className="font-medium text-white">{formData.fullName}</p>
                <p>{formData.phone}</p>
                <p>{formData.email}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">Adres</p>
                <p className="text-white">{formData.address}</p>
                <p>{formData.district} / {formData.city}</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs uppercase tracking-widest">
              <span className="text-zinc-500">Ödeme Yöntemi:</span>
              <span className="font-bold text-white">
                {paymentMethod === "card" && "Kredi / Banka Kartı"}
                {paymentMethod === "door" && "Kapıda Ödeme"}
                {paymentMethod === "bank" && "Havale / EFT"}
              </span>
            </div>
            {hasLuxuryPackaging && (
              <div className="border-t border-white/10 pt-3 text-xs text-zinc-400">
                <p className="font-bold text-white">✓ NLNO Mat Siyah Mühürlü Kutu Seçildi</p>
                {giftNote && <p className="italic text-zinc-400 mt-1">&quot;{giftNote}&quot;</p>}
              </div>
            )}
          </div>

          <p className="mt-8 text-xs text-zinc-500 uppercase tracking-widest">
            Sipariş detaylarınız ve kargo takip numaranız e-posta adresinize gönderilecektir.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Sepet boşsa
  if (loaded && items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white antialiased">
        {header}
        <main className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight">Sepetiniz Boş</h1>
          <p className="mt-4 text-sm text-zinc-400">
            Ödeme yapabilmek için sepetinize en az bir ürün eklemeniz gerekmektedir.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-zinc-300"
          >
            Ürünleri İncele
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      {header}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <h1 className="text-3xl font-black uppercase tracking-tighter sm:text-5xl">Ödeme & Teslimat</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
          Lütfen teslimat ve ödeme bilgilerinizi eksiksiz doldurun.
        </p>

        <form onSubmit={handleSubmitOrder} className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Sol Kolon: Bilgi ve Ödeme Formları */}
          <div className="space-y-10">
            {/* 1. Teslimat Adresi */}
            <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-black">
                  1
                </span>
                <h2 className="text-sm font-bold uppercase tracking-[0.25em]">Teslimat Bilgileri</h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Ahmet Yılmaz"
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.fullName && <p className="mt-1 text-[11px] text-red-400">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0532 000 00 00"
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    E-Posta Adresi *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ornek@email.com"
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    İl *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="İstanbul"
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.city && <p className="mt-1 text-[11px] text-red-400">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="Kadıköy"
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.district && <p className="mt-1 text-[11px] text-red-400">{errors.district}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Açık Adres *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Cadde, sokak, bina ve daire no..."
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                  {errors.address && <p className="mt-1 text-[11px] text-red-400">{errors.address}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Sipariş Notu (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    placeholder="Zili çalmayın, güvenliğe bırakın vb."
                    className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* 2. Ödeme Yöntemi */}
            <section className="border border-white/10 bg-zinc-950 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-black">
                  2
                </span>
                <h2 className="text-sm font-bold uppercase tracking-[0.25em]">Ödeme Seçenekleri</h2>
              </div>

              {/* Yöntem Sekmeleri */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { id: "card" as const, label: "Kredi Kartı" },
                  { id: "door" as const, label: "Kapıda Ödeme" },
                  { id: "bank" as const, label: "Havale / EFT" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`border py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentMethod === opt.id
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-zinc-400 hover:border-white hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Kredi Kartı Formu */}
              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardInfo.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
                        setCardInfo((prev) => ({ ...prev, number: val }));
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm tracking-widest text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                    {errors.cardNumber && <p className="mt-1 text-[11px] text-red-400">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      value={cardInfo.holder}
                      onChange={(e) => setCardInfo((prev) => ({ ...prev, holder: e.target.value.toUpperCase() }))}
                      placeholder="AD SOYAD"
                      className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm uppercase tracking-wider text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                    {errors.cardHolder && <p className="mt-1 text-[11px] text-red-400">{errors.cardHolder}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Son Kullanma (AA/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardInfo.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                          setCardInfo((prev) => ({ ...prev, expiry: val }));
                        }}
                        placeholder="12/28"
                        className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm tracking-wider text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                      />
                      {errors.cardExpiry && <p className="mt-1 text-[11px] text-red-400">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        CVV / Güvenlik Kodu
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                        placeholder="•••"
                        className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm tracking-widest text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                      />
                      {errors.cardCvv && <p className="mt-1 text-[11px] text-red-400">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "door" && (
                <div className="mt-6 border-t border-white/10 pt-6 text-sm text-zinc-400">
                  <p>Kapıda nakit veya kredi kartıyla ödeme yapabilirsiniz. Teslimat anında ek ücret yansıtılmaz.</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-zinc-400">
                  <p className="text-white font-medium">Banka Hesap Bilgilerimiz:</p>
                  <p>Garanti BBVA - TR12 0006 2000 0000 1234 5678 90</p>
                  <p className="text-xs text-zinc-500">Açıklama alanına sipariş verdikten sonra oluşacak sipariş kodunu yazınız.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sağ Kolon: Sipariş Özeti */}
          <aside className="h-fit border border-white/10 bg-zinc-950 p-6 sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Siparişiniz ({totalCount})</h2>

            {/* Ürün Listesi */}
            <ul className="mt-6 max-h-64 divide-y divide-white/10 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center bg-zinc-900 border border-white/10">
                    <GarmentThumb color={item.colorHex} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-bold uppercase tracking-wider text-white">{item.name}</p>
                    <p className="text-[11px] text-zinc-400 uppercase tracking-widest mt-1">
                      {item.size} · {item.colorName} · {item.quantity} Adet
                    </p>
                    <p className="mt-1 text-xs font-semibold text-zinc-300">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Kupon Kodu */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                İndirim Kodu
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="örn: NLNO10"
                  className="flex-1 border border-white/20 bg-black px-3 py-2 text-xs uppercase tracking-wider text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="border border-white/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-white hover:text-black transition-colors"
                >
                  Uygula
                </button>
              </div>
              {couponSuccess && <p className="mt-1 text-[11px] text-emerald-400">{couponSuccess}</p>}
              {couponError && <p className="mt-1 text-[11px] text-red-400">{couponError}</p>}
            </div>

            {/* Fiyat Detayı */}
            <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-400">Ara Toplam</dt>
                <dd>{formatPrice(totalPrice)}</dd>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <dt>İndirim (%{discountPercent})</dt>
                  <dd>-{formatPrice(discountAmount)}</dd>
                </div>
              )}

              {hasLuxuryPackaging && (
                <div className="flex justify-between text-zinc-300">
                  <dt>Özel Mat Kutu & Paketleme</dt>
                  <dd>+{formatPrice(LUXURY_PACKAGING_FEE)}</dd>
                </div>
              )}

              <div className="flex justify-between">
                <dt className="text-zinc-400">Kargo</dt>
                <dd>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</dd>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold">
                <dt className="uppercase tracking-[0.2em]">Genel Toplam</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full bg-white py-5 text-xs font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
            >
              {submitting ? "İşleniyor..." : `Siparişi Onayla · ${formatPrice(grandTotal)}`}
            </button>

            <div className="mt-6 flex justify-around text-center text-[10px] uppercase tracking-wider text-zinc-500 border-t border-white/10 pt-4">
              <span>🔒 256-Bit SSL</span>
              <span>⚡ Hızlı Teslimat</span>
              <span>↺ Ücretsiz İade</span>
            </div>
          </aside>
        </form>
      </main>

      <footer className="mt-16 border-t border-white/10 bg-zinc-950 py-8 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        © 2026 NO LONG NO OUTFIT. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
