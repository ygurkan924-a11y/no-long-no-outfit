"use client";

type GarmentVisualProps = {
  color: string;
  isBack?: boolean;
  isHoodie?: boolean;
  scale?: number;
};

export default function GarmentVisual({
  color,
  isBack = false,
  isHoodie = false,
  scale = 1,
}: GarmentVisualProps) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-out"
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-3/4 w-3/4 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        aria-hidden="true"
      >
        {/* Kapüşon (Hoodie için) */}
        {isHoodie && (
          <ellipse
            cx="50"
            cy="11"
            rx="16"
            ry="10"
            fill={color}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.6"
          />
        )}

        {/* Gövde ve Kollar */}
        <path
          d="M20 10 L35 4 Q50 14 65 4 L80 10 L95 28 L82 38 L76 32 L76 92 L24 92 L24 32 L18 38 L5 28 Z"
          fill={color}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.6"
        />

        {/* Ön Yaka Kesimi */}
        {!isBack && !isHoodie && (
          <path
            d="M35 4 Q50 18 65 4"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.8"
          />
        )}

        {/* Arka Yaka Dikişi */}
        {isBack && (
          <path
            d="M35 4 Q50 9 65 4"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
          />
        )}

        {/* Ön Görünüm: Minimal NLNO Göğüs İmzası */}
        {!isBack && (
          <g opacity="0.65">
            <text
              x="36"
              y="32"
              fill="rgba(255,255,255,0.9)"
              fontSize="2.5"
              fontWeight="900"
              letterSpacing="0.2"
              fontFamily="sans-serif"
            >
              NLNO
            </text>
          </g>
        )}

        {/* Sırt Görünümü: Lüks Tipografik Sırt İmzası */}
        {isBack && (
          <g opacity="0.75">
            <text
              x="50"
              y="38"
              fill="rgba(255,255,255,0.9)"
              fontSize="3.2"
              fontWeight="900"
              letterSpacing="0.3"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              NO LONG NO OUTFIT
            </text>
            <text
              x="50"
              y="44"
              fill="rgba(255,255,255,0.4)"
              fontSize="1.8"
              fontWeight="bold"
              letterSpacing="0.25"
              textAnchor="middle"
            >
              HEAVYWEIGHT STREETWEAR
            </text>
            <line
              x1="40"
              y1="48"
              x2="60"
              y2="48"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

