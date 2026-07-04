import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, ArrowRight, HelpCircle, AlertCircle, RefreshCw, 
  CheckCircle, XCircle, ChevronRight, BookOpen, Clock 
} from 'lucide-react';
import { quizQuestions } from '../data/quiz';

export default function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // History tracking to show scorecard on complete
  const [history, setHistory] = useState<Array<{ id: number; question: string; chosen: string; correct: string; isRight: boolean }>>([]);

  const currentQuestion = quizQuestions[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return; // ignore if already committed
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      ...prev,
      {
        id: currentQuestion.id,
        question: currentQuestion.question,
        chosen: selectedOption,
        correct: currentQuestion.correctAnswer,
        isRight: isCorrect,
      },
    ]);

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setHistory([]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm max-w-2xl mx-auto" id="quiz-root-component">
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key="quiz-active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3" id="quiz-active-header">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                  <BookOpen className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">React Architecture Quiz</h3>
                  <p className="text-[10px] text-slate-400">Evaluate declarative paradigm understanding</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Q: {currentIndex + 1} / {quizQuestions.length}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5" id="quiz-question-box">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-slate-800 leading-normal">
                  {currentQuestion.question}
                </h4>
              </div>
            </div>

            {/* Options list */}
            <div className="space-y-2.5" id="quiz-options-list">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt;
                
                // Color formatting classes
                let cardClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50';
                let iconElement = <span className="h-4 w-4 rounded-full border border-slate-300 bg-white shrink-0 mt-0.5" />;

                if (isAnswered) {
                  const isCorrectAnswer = opt === currentQuestion.correctAnswer;
                  if (isCorrectAnswer) {
                    cardClass = 'border-emerald-500 bg-emerald-50/40 text-emerald-950 font-medium';
                    iconElement = <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />;
                  } else if (isSelected) {
                    cardClass = 'border-rose-500 bg-rose-50/40 text-rose-950';
                    iconElement = <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />;
                  } else {
                    cardClass = 'border-slate-100 bg-slate-50/20 opacity-60';
                  }
                } else if (isSelected) {
                  cardClass = 'border-indigo-500 bg-indigo-50/40 font-semibold ring-1 ring-indigo-500';
                  iconElement = <span className="h-4 w-4 rounded-full border-4 border-indigo-600 bg-white shrink-0 mt-0.5" />;
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-lg border text-xs text-left flex items-start gap-3 transition-all cursor-pointer ${cardClass}`}
                    id={`quiz-option-btn-${opt.slice(0, 10)}`}
                  >
                    {iconElement}
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanatory Panel (After answer committed) */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-indigo-50/80 border border-indigo-150 p-4 rounded-lg space-y-1 text-xs"
                  id="quiz-explanation-box"
                >
                  <span className="font-bold text-indigo-800 uppercase tracking-wider text-[10px] block">
                    💡 Concept Explanation
                  </span>
                  <p className="text-slate-700 leading-normal">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls panel */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100" id="quiz-controls">
              <div>
                {!isAnswered && selectedOption && (
                  <p className="text-[10px] text-indigo-600 font-bold animate-pulse">
                    Click Submit to verify state answer
                  </p>
                )}
              </div>

              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    selectedOption
                      ? 'bg-slate-950 hover:bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                  id="quiz-submit-btn"
                >
                  Submit Answer <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  id="quiz-next-btn"
                >
                  {currentIndex + 1 === quizQuestions.length ? 'Show Results' : 'Next Question'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-scorecard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
            id="quiz-completed-box"
          >
            <Trophy className="h-14 w-14 text-amber-500 stroke-1.2 mx-auto animate-bounce mt-4" />
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Quiz Completed!</h3>
              <p className="text-xs text-slate-500">Here is your comprehensive architectural scorecard:</p>
            </div>

            {/* Cumulative visual circle score */}
            <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-full h-32 w-32 mx-auto shadow-xs">
              <span className="text-3xl font-black text-indigo-600 font-mono">
                {score} <span className="text-slate-300 text-xl">/</span> {quizQuestions.length}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                {Math.round((score / quizQuestions.length) * 100)}% Grade
              </span>
            </div>

            {/* Scorecard checklist items */}
            <div className="space-y-2 text-left bg-slate-50 border border-slate-150 p-4 rounded-xl" id="quiz-scorecard-list">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide border-b border-slate-250 pb-1.5 mb-2.5">
                Detailed Response Logs
              </h4>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {history.map((hist, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/60 p-2.5 rounded-lg flex items-start justify-between gap-3 text-[11px] leading-relaxed">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800">{hist.id}. {hist.question}</p>
                      <p className="text-slate-500">
                        Chosen: <span className={hist.isRight ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>{hist.chosen}</span>
                      </p>
                    </div>
                    {hist.isRight ? (
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleRestartQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-5 py-2.5 rounded-lg font-bold flex items-center gap-1.5 mx-auto cursor-pointer"
              id="quiz-restart-btn"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retake Architecture Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
