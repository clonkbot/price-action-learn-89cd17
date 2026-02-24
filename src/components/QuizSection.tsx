import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "A red candlestick means:",
    options: [
      "Price opened high and closed lower",
      "Price opened low and closed higher",
      "The stock is going bankrupt",
      "Volume was very high"
    ],
    correctIndex: 0,
    explanation: "Red (bearish) candles show that price closed LOWER than it opened, meaning sellers won that period."
  },
  {
    id: 2,
    question: "In the stair-step pattern, what does wave 2 represent?",
    options: [
      "The strongest move down",
      "A bounce against the trend",
      "The final capitulation",
      "A breakout signal"
    ],
    correctIndex: 1,
    explanation: "Wave 2 is a corrective bounce AGAINST the main trend. It's where short-term buyers step in before the next leg down."
  },
  {
    id: 3,
    question: "When support breaks, it often becomes:",
    options: [
      "Irrelevant",
      "Stronger support",
      "Resistance",
      "A gap"
    ],
    correctIndex: 2,
    explanation: "This is called 'polarity' — broken support becomes resistance because trapped buyers become sellers when price returns."
  },
  {
    id: 4,
    question: "A long upper wick indicates:",
    options: [
      "Strong buying pressure",
      "Price was rejected from highs",
      "The candle is bullish",
      "Low volume"
    ],
    correctIndex: 1,
    explanation: "Long upper wicks show that sellers pushed price back down from its highs — there was supply (selling pressure) at that level."
  }
];

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showExplanation) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassing = percentage >= 75;

    return (
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 lg:p-12 text-center">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl flex items-center justify-center ${isPassing ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
          <span className="text-3xl sm:text-4xl">{isPassing ? '🎉' : '📚'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
          {isPassing ? 'Great Job!' : 'Keep Learning!'}
        </h3>

        <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-6">
          You scored <span className={`font-mono font-bold ${isPassing ? 'text-emerald-400' : 'text-amber-400'}`}>{score}/{questions.length}</span> ({percentage}%)
        </p>

        <button
          onClick={resetQuiz}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm sm:text-base hover:bg-cyan-500/20 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl">🧠</span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Test Your Knowledge</h3>
          </div>

          <div className="flex items-center gap-2 text-white/40 font-mono text-xs sm:text-sm">
            <span className="text-cyan-400">{currentQuestion + 1}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-base sm:text-lg lg:text-xl font-medium mb-4 sm:mb-6">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctIndex;
            const showResult = showExplanation;

            let bgClass = 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]';
            if (showResult && isCorrect) {
              bgClass = 'bg-emerald-500/10 border-emerald-500/30';
            } else if (showResult && isSelected && !isCorrect) {
              bgClass = 'bg-rose-500/10 border-rose-500/30';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showExplanation}
                className={`
                  w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200
                  ${bgClass}
                  ${showExplanation ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className={`
                    w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs sm:text-sm
                    ${showResult && isCorrect ? 'bg-emerald-500/20 text-emerald-400' : ''}
                    ${showResult && isSelected && !isCorrect ? 'bg-rose-500/20 text-rose-400' : ''}
                    ${!showResult ? 'bg-white/5 text-white/40' : ''}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`text-sm sm:text-base ${showResult && isCorrect ? 'text-emerald-400' : 'text-white/80'}`}>
                    {option}
                  </span>

                  {showResult && isCorrect && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-start gap-3">
              <span className="text-lg sm:text-xl">💡</span>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-4 sm:mt-6 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-white font-medium hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
