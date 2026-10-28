'use client';

import { useState, useEffect } from 'react';
import { QuizQuestion } from '@/lib/types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowLeft, ArrowRight, RotateCcw, HelpCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizProps {
  questions: QuizQuestion[];
  sectionId: string;
  onQuizComplete: (score: number, maxScore: number, passed: boolean) => void;
  savedScore?: { score: number; maxScore: number; passed: boolean } | null;
  id?: string;
}

export default function Quiz({ questions, sectionId, onQuizComplete, savedScore, id }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, { selected: number[]; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Load saved score state if already passed
  useEffect(() => {
    if (savedScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync quiz view to a previously saved score
      setFinalScore(savedScore.score);
      setIsFinished(true);
    } else {
      // Reset quiz state when questions/section change
      setCurrentIndex(0);
      setSelectedAnswers([]);
      setIsSubmitted(false);
      setAnswersHistory({});
      setIsFinished(false);
      setFinalScore(0);
    }
  }, [sectionId, savedScore]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return; // Locked after submission

    if (currentQuestion.type === 'single-choice' || currentQuestion.type === 'true-false') {
      setSelectedAnswers([index]);
    } else {
      // Multiple choice
      if (selectedAnswers.includes(index)) {
        setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
      } else {
        setSelectedAnswers([...selectedAnswers, index]);
      }
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswers.length === 0) return;

    // Check if correctAnswers matches selectedAnswers exactly (sorting is important)
    const sortedCorrect = [...currentQuestion.correctAnswers].sort();
    const sortedSelected = [...selectedAnswers].sort();
    const isCorrect =
      sortedCorrect.length === sortedSelected.length &&
      sortedCorrect.every((val, idx) => val === sortedSelected[idx]);

    // Save to history
    setAnswersHistory((prev) => ({
      ...prev,
      [currentIndex]: { selected: selectedAnswers, isCorrect },
    }));

    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Check if we already answered this in history to pre-populate (or let them answer fresh)
      if (answersHistory[nextIndex]) {
        setSelectedAnswers(answersHistory[nextIndex].selected);
        setIsSubmitted(true);
      } else {
        setSelectedAnswers([]);
        setIsSubmitted(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedAnswers(answersHistory[prevIndex]?.selected || []);
      setIsSubmitted(true);
    }
  };

  const handleFinish = () => {
    // Calculate final score
    let score = 0;
    questions.forEach((_, idx) => {
      if (answersHistory[idx]?.isCorrect) {
        score += 1;
      }
    });

    setFinalScore(score);
    setIsFinished(true);

    const passed = score >= Math.ceil(questions.length * 0.7); // 70% passing grade
    onQuizComplete(score, questions.length, passed);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setIsSubmitted(false);
    setAnswersHistory({});
    setIsFinished(false);
    setFinalScore(0);
  };

  // Helper styles for option states
  const getOptionStyle = (index: number) => {
    const isSelected = selectedAnswers.includes(index);
    const isCorrectChoice = currentQuestion.correctAnswers.includes(index);

    if (!isSubmitted) {
      return isSelected
        ? 'border-natural-brand bg-natural-brand-light text-natural-brand dark:border-blue-500 dark:bg-blue-950/20'
        : 'border-natural-border dark:border-slate-800 hover:bg-[#F9F9F7] dark:hover:bg-slate-700 bg-white dark:bg-slate-900/50 text-[#2D2D2D] dark:text-slate-300';
    }

    // Submitted states
    if (isCorrectChoice) {
      return 'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-200 font-medium';
    }

    if (isSelected && !isCorrectChoice) {
      return 'border-rose-500 bg-rose-50/70 text-rose-900 dark:border-rose-500 dark:bg-rose-950/30 dark:text-rose-200';
    }

    return 'border-[#E5E5DF] dark:border-slate-800 opacity-60 bg-white dark:bg-slate-900/20 text-[#7A7A70] dark:text-slate-400';
  };

  if (isFinished) {
    const totalQuestions = questions.length;
    const passed = finalScore >= Math.ceil(totalQuestions * 0.7);

    return (
      <div id={id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          {/* Animated Score Circle */}
          <div className="relative flex items-center justify-center w-32 h-32 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="10" />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                className="stroke-natural-brand dark:stroke-blue-500 fill-none"
                strokeWidth="10"
                strokeDasharray={351.8}
                initial={{ strokeDashoffset: 351.8 }}
                animate={{ strokeDashoffset: 351.8 - (351.8 * finalScore) / totalQuestions }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                {finalScore}
                <span className="text-xl text-slate-400">/{totalQuestions}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Score</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-4">
            {passed ? (
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PASSING GRADE SECURED
              </span>
            ) : (
              <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> RETRY TO UNLOCK NEXT LEVEL
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold font-sans text-slate-950 dark:text-white">
            {passed ? 'Assessment Success!' : 'Quiz Not Passed'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {passed
              ? 'Excellent critical thinking! You have successfully completed the section and verified the core disinformation tactics.'
              : 'You scored below the 70% passing threshold. review the video and text lesson points, then retry the assessment.'}
          </p>

          <div className="w-full mt-8 space-y-3">
            <Button variant="outline" onClick={handleRetry} className="w-full">
              <RotateCcw className="w-4 h-4" />
              <span>Retry Assessment</span>
            </Button>
          </div>
        </div>

        {/* Detailed Review Breakdown */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/80">
          <h4 className="text-base font-bold font-sans text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span>Assessment Item Breakdown</span>
          </h4>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const history = answersHistory[idx];
              const isCorrect = history?.isCorrect;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    isCorrect
                      ? 'border-emerald-100 bg-emerald-50/10 dark:border-emerald-900/30'
                      : 'border-rose-100 bg-rose-50/10 dark:border-rose-900/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                        Question {idx + 1}
                      </span>
                      <h5 className="text-sm font-bold font-sans text-slate-900 dark:text-slate-100 leading-snug">
                        {q.question}
                      </h5>

                      {/* Options Breakdown */}
                      <div className="mt-3 space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const wasSelected = history?.selected?.includes(oIdx);
                          const isCorrectChoice = q.correctAnswers.includes(oIdx);
                          return (
                            <div
                              key={oIdx}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-sans ${
                                isCorrectChoice
                                  ? 'bg-emerald-100/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-medium'
                                  : wasSelected
                                  ? 'bg-rose-100/40 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300'
                                  : 'text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              <span className="font-semibold">{String.fromCharCode(65 + oIdx)})</span>
                              <span>{opt}</span>
                              {isCorrectChoice && (
                                <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded-full uppercase font-bold font-mono">
                                  Correct
                                </span>
                              )}
                              {wasSelected && !isCorrectChoice && (
                                <span className="ml-auto text-[10px] bg-rose-500/20 text-rose-700 dark:text-rose-400 px-1.5 py-0.2 rounded-full uppercase font-bold font-mono">
                                  Selected
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex gap-2">
                        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-700 dark:text-slate-200">Fact-Check: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-natural-brand-light dark:bg-blue-950/40 text-natural-brand dark:text-blue-400 text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border border-natural-border dark:border-blue-900/50">
              {currentQuestion.type === 'multiple-choice' ? 'Select Multiple' : 'Single Answer'}
            </span>
            <span className="text-[#7A7A70] text-xs font-mono font-semibold">
              QUESTION {currentIndex + 1} OF {questions.length}
            </span>
          </div>
          <h3 className="text-base font-bold font-serif text-[#1A1A1A] mt-1.5 leading-snug">{currentQuestion.question}</h3>
        </div>
      </div>

      {/* Options List */}
      <div className="mt-6 space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isSubmitted}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left text-sm transition-all focus:outline-hidden cursor-pointer ${getOptionStyle(index)}`}
            >
              {/* Option Index Label */}
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold font-mono transition-colors ${
                  isSelected ? 'bg-natural-brand text-white' : 'bg-natural-beige text-[#7A7A70] dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>

              {/* Option Text */}
              <span className="flex-1 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">{option}</span>

              {/* Icon Status */}
              {isSubmitted && currentQuestion.correctAnswers.includes(index) && <Check className="w-5 h-5 text-emerald-500 shrink-0" />}
              {isSubmitted && isSelected && !currentQuestion.correctAnswers.includes(index) && (
                <X className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (Animate presence) */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-150 dark:border-slate-800 flex gap-3 overflow-hidden"
          >
            <div className="p-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 h-fit">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase font-mono text-slate-500 tracking-wider">Fact-Check & Learning Insight</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-sans">{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
            currentIndex === 0
              ? 'opacity-40 border-slate-100 text-slate-300 dark:border-slate-800 cursor-not-allowed'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedAnswers.length === 0}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer ${
              selectedAnswers.length === 0
                ? 'bg-slate-100 text-[#9A9A92] dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                : 'bg-[#1A1A1A] hover:bg-black text-white'
            }`}
          >
            Check Answer
          </button>
        ) : currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="px-5 py-2.5 rounded-lg bg-natural-brand hover:bg-[#3D4D41] text-white text-xs font-bold shadow-md hover:shadow-emerald-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Finish Assessment</span>
            <CheckCircle2 className="w-4.5 h-4.5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-lg bg-natural-brand hover:bg-[#3D4D41] text-white text-xs font-bold shadow-md hover:shadow-blue-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
