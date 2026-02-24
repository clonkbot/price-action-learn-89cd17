interface ProgressTrackerProps {
  completed: number;
  total: number;
}

export function ProgressTracker({ completed, total }: ProgressTrackerProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Progress Ring */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 0.94} 100`}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-white/80">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="hidden sm:block">
        <p className="text-white/60 text-xs font-mono">
          <span className="text-cyan-400">{completed}</span> / {total} complete
        </p>
      </div>
    </div>
  );
}
