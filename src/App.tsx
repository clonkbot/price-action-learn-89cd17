import { useState } from 'react';
import { LessonCard } from './components/LessonCard';
import { CandlestickChart } from './components/CandlestickChart';
import { ConceptExplainer } from './components/ConceptExplainer';
import { ProgressTracker } from './components/ProgressTracker';
import { QuizSection } from './components/QuizSection';

const lessons = [
  {
    id: 1,
    title: "Understanding Candlesticks",
    subtitle: "The Building Blocks",
    description: "Learn how to read candlestick bodies and wicks to understand price movement.",
    completed: false,
  },
  {
    id: 2,
    title: "Bearish Stair-Step Pattern",
    subtitle: "Breakdown Structure",
    description: "Identify the numbered breakdown pattern showing lower highs and lower lows.",
    completed: false,
  },
  {
    id: 3,
    title: "Support & Resistance Levels",
    subtitle: "Key Price Zones",
    description: "Spot horizontal levels where price reacts and bounces.",
    completed: false,
  },
  {
    id: 4,
    title: "Wave Counting Basics",
    subtitle: "Structure Recognition",
    description: "Learn to count waves (1, 2, 3) to predict potential reversals.",
    completed: false,
  },
];

function App() {
  const [activeLesson, setActiveLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const markComplete = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-rose-900/10 pointer-events-none" />

      {/* Grid pattern background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-mono text-xl sm:text-2xl font-bold tracking-tight">
                  <span className="text-cyan-400">&gt;</span> PRICE_ACTION
                  <span className="text-rose-400">.learn</span>
                </h1>
                <p className="text-white/40 text-xs sm:text-sm mt-1 font-mono">
                  Master bearish breakdown patterns
                </p>
              </div>
              <ProgressTracker
                completed={completedLessons.length}
                total={lessons.length}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Hero Section */}
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-rose-500" />

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 sm:mb-6">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Live Pattern</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                      Stair-Step <span className="text-rose-400">Breakdown</span> Pattern
                    </h2>

                    <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                      This pattern shows a stock making <span className="text-rose-400 font-medium">lower highs</span> and
                      <span className="text-rose-400 font-medium"> lower lows</span> in a structured descent.
                      Each numbered level represents a new wave down.
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="px-3 sm:px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-mono">
                        GOOGL
                      </span>
                      <span className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm font-mono">
                        1D Timeframe
                      </span>
                      <span className="px-3 sm:px-4 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm font-mono">
                        Bearish
                      </span>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <CandlestickChart />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Lessons Grid */}
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Learning Modules</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isActive={activeLesson === lesson.id}
                  isCompleted={completedLessons.includes(lesson.id)}
                  onClick={() => setActiveLesson(lesson.id)}
                />
              ))}
            </div>
          </section>

          {/* Active Lesson Content */}
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <ConceptExplainer
              lessonId={activeLesson}
              onComplete={() => markComplete(activeLesson)}
              isCompleted={completedLessons.includes(activeLesson)}
            />
          </section>

          {/* Quiz Section */}
          <section>
            <QuizSection />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-8 sm:mt-12 lg:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <p className="text-center text-white/30 text-xs font-mono">
              Requested by <span className="text-white/50">@O_Meezly</span> · Built by <span className="text-white/50">@clonkbot</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
