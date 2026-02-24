import { useState } from 'react';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  label?: string;
}

const candleData: Candle[] = [
  { open: 337, close: 340, high: 341, low: 336 },
  { open: 340, close: 338, high: 341, low: 335, label: '2' },
  { open: 338, close: 335, high: 339, low: 333, label: '2' },
  { open: 335, close: 333, high: 336, low: 330, label: '1' },
  { open: 333, close: 328, high: 334, low: 326, label: '3' },
  { open: 328, close: 330, high: 331, low: 327, label: '2' },
  { open: 330, close: 325, high: 331, low: 323 },
  { open: 325, close: 322, high: 326, low: 320, label: '1' },
  { open: 322, close: 324, high: 325, low: 321 },
  { open: 324, close: 320, high: 325, low: 318, label: '2' },
  { open: 320, close: 318, high: 321, low: 316 },
  { open: 318, close: 316, high: 319, low: 314, label: '2' },
  { open: 316, close: 312, high: 317, low: 310, label: '2' },
  { open: 312, close: 315, high: 316, low: 311 },
  { open: 315, close: 309, high: 316, low: 308, label: '2' },
  { open: 309, close: 307, high: 310, low: 305, label: '2' },
];

const priceLines = [340, 332.69, 330.38, 327.70, 325, 321.67, 316.24, 309.28];

export function CandlestickChart() {
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  const minPrice = 300;
  const maxPrice = 345;
  const priceRange = maxPrice - minPrice;

  const scaleY = (price: number) => {
    return ((maxPrice - price) / priceRange) * 100;
  };

  const chartHeight = 280;
  const chartWidth = 100;
  const candleWidth = 100 / candleData.length;

  return (
    <div className="relative bg-[#0d0d14] rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 overflow-hidden">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-sm sm:text-base font-bold text-white">GOOGL</span>
          <span className="text-white/40 text-xs sm:text-sm font-mono">1D</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-emerald-500" />
          <span className="text-white/40 text-xs hidden sm:inline">Bullish</span>
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-rose-500 ml-2 sm:ml-3" />
          <span className="text-white/40 text-xs hidden sm:inline">Bearish</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        {/* Price Lines */}
        {priceLines.map((price) => (
          <div
            key={price}
            className="absolute left-0 right-0 border-t border-dashed border-white/5 flex items-center"
            style={{ top: `${scaleY(price)}%` }}
          >
            <span className="absolute right-0 translate-x-full pl-1 sm:pl-2 text-[9px] sm:text-[10px] font-mono text-white/30">
              {price.toFixed(price % 1 === 0 ? 0 : 2)}
            </span>
          </div>
        ))}

        {/* Horizontal Support/Resistance Levels */}
        <div
          className="absolute left-0 right-12 sm:right-16 h-px bg-white/20"
          style={{ top: `${scaleY(332.69)}%` }}
        />
        <div
          className="absolute left-0 right-12 sm:right-16 h-px bg-white/20"
          style={{ top: `${scaleY(330.38)}%` }}
        />
        <div
          className="absolute left-0 right-12 sm:right-16 h-px bg-white/20"
          style={{ top: `${scaleY(327.70)}%` }}
        />
        <div
          className="absolute left-0 right-12 sm:right-16 h-px bg-white/20"
          style={{ top: `${scaleY(321.67)}%` }}
        />
        <div
          className="absolute left-0 right-12 sm:right-16 h-px bg-white/20"
          style={{ top: `${scaleY(316.24)}%` }}
        />

        {/* Current Price Line */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-rose-500/50"
          style={{ top: `${scaleY(309.28)}%` }}
        >
          <span className="absolute right-0 -translate-y-1/2 px-1.5 sm:px-2 py-0.5 bg-rose-500 text-[9px] sm:text-[10px] font-mono text-white rounded">
            309.28
          </span>
        </div>

        {/* Candlesticks SVG */}
        <svg
          viewBox={`0 0 ${chartWidth} 100`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pr-12 sm:pr-16"
          style={{ overflow: 'visible' }}
        >
          {candleData.map((candle, i) => {
            const isBullish = candle.close > candle.open;
            const bodyTop = scaleY(Math.max(candle.open, candle.close));
            const bodyBottom = scaleY(Math.min(candle.open, candle.close));
            const bodyHeight = Math.max(bodyBottom - bodyTop, 0.5);
            const wickTop = scaleY(candle.high);
            const wickBottom = scaleY(candle.low);
            const x = i * candleWidth + candleWidth / 2;
            const isHovered = hoveredCandle === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredCandle(i)}
                onMouseLeave={() => setHoveredCandle(null)}
                className="cursor-pointer"
              >
                {/* Wick */}
                <line
                  x1={x}
                  y1={wickTop}
                  x2={x}
                  y2={wickBottom}
                  stroke={isBullish ? '#10b981' : '#f43f5e'}
                  strokeWidth={isHovered ? 0.4 : 0.3}
                  className="transition-all duration-200"
                />

                {/* Body */}
                <rect
                  x={x - candleWidth * 0.35}
                  y={bodyTop}
                  width={candleWidth * 0.7}
                  height={bodyHeight}
                  fill={isBullish ? '#10b981' : '#f43f5e'}
                  className={`transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-90'}`}
                  rx={0.2}
                />

                {/* Label */}
                {candle.label && (
                  <text
                    x={x}
                    y={wickBottom + 4}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.6)"
                    fontSize="3"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {candle.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Stair-step lines connecting lows */}
          <path
            d={`M ${1 * candleWidth} ${scaleY(336)}
                L ${3 * candleWidth} ${scaleY(336)}
                L ${3 * candleWidth} ${scaleY(330)}
                L ${6 * candleWidth} ${scaleY(330)}
                L ${6 * candleWidth} ${scaleY(323)}
                L ${9 * candleWidth} ${scaleY(323)}
                L ${9 * candleWidth} ${scaleY(318)}
                L ${12 * candleWidth} ${scaleY(318)}
                L ${12 * candleWidth} ${scaleY(310)}
                L ${15 * candleWidth} ${scaleY(310)}
                L ${15 * candleWidth} ${scaleY(305)}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.3"
            strokeDasharray="1,0.5"
          />
        </svg>
      </div>

      {/* Date axis */}
      <div className="flex justify-between mt-2 sm:mt-3 pr-12 sm:pr-16 text-[9px] sm:text-[10px] font-mono text-white/30">
        <span>Feb</span>
        <span>5</span>
        <span>10</span>
        <span>13</span>
        <span>19</span>
        <span>24</span>
      </div>

      {/* Hover Tooltip */}
      {hoveredCandle !== null && (
        <div className="absolute top-12 sm:top-14 left-3 sm:left-4 bg-black/90 border border-white/10 rounded-lg p-2 sm:p-3 font-mono text-[10px] sm:text-xs z-10">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className={`w-2 h-2 rounded-full ${candleData[hoveredCandle].close > candleData[hoveredCandle].open ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="text-white/60">Candle {hoveredCandle + 1}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-0.5 sm:gap-y-1 text-white/80">
            <span className="text-white/40">Open:</span>
            <span>${candleData[hoveredCandle].open}</span>
            <span className="text-white/40">Close:</span>
            <span>${candleData[hoveredCandle].close}</span>
            <span className="text-white/40">High:</span>
            <span>${candleData[hoveredCandle].high}</span>
            <span className="text-white/40">Low:</span>
            <span>${candleData[hoveredCandle].low}</span>
          </div>
        </div>
      )}
    </div>
  );
}
