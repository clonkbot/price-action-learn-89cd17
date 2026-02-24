interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function LessonCard({ lesson, index, isActive, isCompleted, onClick }: LessonCardProps) {
  const icons = ['📊', '📉', '📐', '🌊'];

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full text-left p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300
        ${isActive
          ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/30 shadow-lg shadow-cyan-500/10'
          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
        }
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`
          w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0
          ${isActive ? 'bg-cyan-500/20' : 'bg-white/5'}
        `}>
          {icons[index]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] sm:text-xs text-white/30">
              {String(lesson.id).padStart(2, '0')}
            </span>
            <span className={`
              px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono uppercase tracking-wider
              ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/40'}
            `}>
              {lesson.subtitle}
            </span>
          </div>

          <h4 className={`
            text-sm sm:text-base font-semibold mb-1 sm:mb-2 transition-colors truncate
            ${isActive ? 'text-white' : 'text-white/80'}
          `}>
            {lesson.title}
          </h4>

          <p className="text-white/40 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {lesson.description}
          </p>
        </div>
      </div>

      {/* Active indicator line */}
      {isActive && (
        <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      )}
    </button>
  );
}
