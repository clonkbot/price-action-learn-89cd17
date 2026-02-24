interface ConceptExplainerProps {
  lessonId: number;
  onComplete: () => void;
  isCompleted: boolean;
}

const lessonContent = {
  1: {
    title: "Understanding Candlesticks",
    sections: [
      {
        heading: "What is a Candlestick?",
        content: "A candlestick shows four key prices: Open, High, Low, and Close (OHLC). The thick body shows the range between open and close, while the thin wicks show the high and low extremes."
      },
      {
        heading: "Bullish vs Bearish",
        content: "Green (bullish) candles close HIGHER than they open — buyers won. Red (bearish) candles close LOWER than they open — sellers won. The color instantly tells you who controlled that time period."
      },
      {
        heading: "Reading the Wicks",
        content: "Long upper wicks mean price was rejected from highs (sellers pushed back). Long lower wicks mean price was rejected from lows (buyers stepped in). These rejections reveal where supply and demand exist."
      }
    ],
    keyTakeaway: "Each candle is a battle between buyers and sellers. Learn to see who won and where the fight was most intense."
  },
  2: {
    title: "Bearish Stair-Step Pattern",
    sections: [
      {
        heading: "The Structure",
        content: "This pattern shows price descending in 'steps' — each bounce (wave 2) fails to reach the previous high, and each drop (wave 1 or 3) makes a new low. It's like walking down stairs."
      },
      {
        heading: "Wave Counting",
        content: "The numbers you see (1, 2, 3) represent wave counts. Wave 1 and 3 move WITH the trend (down). Wave 2 moves AGAINST the trend (a bounce up). This is based on Elliott Wave Theory simplified."
      },
      {
        heading: "Why It Works",
        content: "Each failed bounce shows sellers are stronger than buyers. The horizontal lines mark where previous support becomes new resistance — trapped buyers become sellers when price returns to their entry."
      }
    ],
    keyTakeaway: "The stair-step pattern confirms a downtrend. Each lower high and lower low tells you sellers remain in control."
  },
  3: {
    title: "Support & Resistance Levels",
    sections: [
      {
        heading: "What Are These Levels?",
        content: "The horizontal lines on the chart mark key price zones. Support is where price tends to stop falling (buyers step in). Resistance is where price tends to stop rising (sellers step in)."
      },
      {
        heading: "Role Reversal",
        content: "When support breaks, it often becomes resistance. Look at the chart — each horizontal line that price fell through later acted as a ceiling on bounces. This is called 'polarity' or 'flip zones'."
      },
      {
        heading: "Trading These Levels",
        content: "Wait for price to test these levels, then watch HOW it reacts. A strong rejection (big wick) or failure to close above means the level is holding. These are high-probability entry points."
      }
    ],
    keyTakeaway: "Support and resistance are where battles happen. Old support becoming new resistance is one of the most reliable patterns in trading."
  },
  4: {
    title: "Wave Counting Basics",
    sections: [
      {
        heading: "Impulse vs Correction",
        content: "Waves labeled 1 and 3 are impulse waves — they move fast in the trend direction. Wave 2 is a correction — it moves slower against the trend. Impulse waves are usually longer than corrections."
      },
      {
        heading: "Using Counts Predictively",
        content: "After counting a complete 1-2-3 sequence, expect either a continuation (new 1-2-3) or a larger correction/reversal. The chart shows multiple 1-2-3 sequences stacking down."
      },
      {
        heading: "Keep It Simple",
        content: "Don't overcomplicate wave counting. Look for the basic structure: strong move (1), weak bounce (2), another strong move (3). If you can see this pattern repeating, you understand the trend."
      }
    ],
    keyTakeaway: "Wave counting helps you anticipate what comes next. After wave 2 bounces, expect wave 3 to continue the trend."
  }
};

export function ConceptExplainer({ lessonId, onComplete, isCompleted }: ConceptExplainerProps) {
  const content = lessonContent[lessonId as keyof typeof lessonContent];

  if (!content) return null;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg sm:text-xl lg:text-2xl text-cyan-400">
              {String(lessonId).padStart(2, '0')}
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{content.title}</h3>
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono">Completed</span>
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs sm:text-sm hover:bg-cyan-500/20 transition-colors w-full sm:w-auto"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {content.sections.map((section, index) => (
          <div
            key={index}
            className="relative pl-4 sm:pl-6 border-l-2 border-white/10"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-cyan-500" />

            <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white/90">
              {section.heading}
            </h4>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Key Takeaway */}
      <div className="mx-4 sm:mx-6 lg:mx-8 mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
            <span className="text-lg sm:text-xl">💡</span>
          </div>
          <div>
            <h5 className="font-mono text-xs sm:text-sm text-cyan-400 uppercase tracking-wider mb-1 sm:mb-2">
              Key Takeaway
            </h5>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {content.keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
