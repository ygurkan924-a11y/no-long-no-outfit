"use client";

export default function SizeGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl border border-white/20 bg-zinc-950 p-6 sm:p-10 text-white shadow-2xl">
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white text-lg transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-bold tracking-[0.25em] text-xs uppercase">
            NO LONG NO OUTFIT
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs uppercase tracking-widest text-zinc-500">BEDEN REHBERİ</span>
        </div>

        <h3 className="mt-3 text-3xl font-black uppercase tracking-tight">
          Beden & Boy / Kilo Rehberi
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          Koleksiyonumuzdaki tüm parçalar <strong className="text-white">geniş omuzlu, kutu kesim (Boxy) ve dökümlü oversize</strong> olarak üretilmiştir. Normal bedeninizi seçtiğinizde dökümlü sokak silüetini yakalayabilirsiniz.
        </p>

        {/* Tablo */}
        <div className="mt-6 overflow-x-auto border border-white/10">
          <table className="w-full text-left text-xs uppercase tracking-wider">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900/80 text-zinc-400">
                <th className="p-3.5 font-bold">Beden</th>
                <th className="p-3.5 font-bold">Önerilen Boy</th>
                <th className="p-3.5 font-bold">Önerilen Kilo</th>
                <th className="p-3.5 font-bold">Kalıp Duruşu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td className="p-3.5 font-black text-white">S</td>
                <td className="p-3.5">165 - 173 cm</td>
                <td className="p-3.5">55 - 68 kg</td>
                <td className="p-3.5 text-zinc-400">Dengeli Oversize</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-white">M</td>
                <td className="p-3.5">172 - 180 cm</td>
                <td className="p-3.5">68 - 78 kg</td>
                <td className="p-3.5 text-zinc-400">Rahat Bol Kesim</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-white">L</td>
                <td className="p-3.5">178 - 186 cm</td>
                <td className="p-3.5">78 - 88 kg</td>
                <td className="p-3.5 text-zinc-400">Geniş Sokak Duruşu</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-white">XL</td>
                <td className="p-3.5">184 - 192 cm</td>
                <td className="p-3.5">88 - 98 kg</td>
                <td className="p-3.5 text-zinc-400">Ağır Döküm</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-white">XXL</td>
                <td className="p-3.5">190+ cm</td>
                <td className="p-3.5">98 - 115+ kg</td>
                <td className="p-3.5 text-zinc-400">Maksimum Boxy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 text-[11px] text-zinc-500 uppercase tracking-widest">
          <span>✓ 14 gün içinde koşulsuz ücretsiz beden değişimi</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white px-8 py-3 font-bold text-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}
