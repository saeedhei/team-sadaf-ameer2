// components/quiz/QuizCard.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuizOptions } from "./QuizOptions";
import { QuizQuestion, QuizResult } from "@/types/course";
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
} from "lucide-react";

interface QuizCardProps {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore?: number; // Pass percentage, default 70%
  isCompleted?: boolean;
  onComplete: (result: QuizResult) => void;
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quizId,
  title,
  questions,
  passingScore = 70,
  isCompleted = false,
  onComplete,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  // Handle option selection for current question
  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  // Check if all questions are answered
  const allAnswered = questions.every((q) => selectedAnswers[q.id]);

  // Calculate progress percentage based on current question index
  const progressPercentage = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  // Handle Quiz Submission & Score Calculation
  const handleSubmitQuiz = () => {
    let score = 0;

    questions.forEach((question) => {
      const selectedId = selectedAnswers[question.id];
      if (selectedId && selectedId === question.correctOptionId) {
        score += 1;
      }
    });

    const calculatedPercentage = Math.round((score / questions.length) * 100);
    const passed = calculatedPercentage >= passingScore;

    const result: QuizResult = {
      quizId,
      score,
      totalQuestions: questions.length,
      percentage: calculatedPercentage,
      passed,
    };

    setQuizResult(result);
    setIsSubmitted(true);
  };

  // Handle Retry
  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizResult(null);
    setCurrentIndex(0);
  };

  // Handle Finish Section Callback
  const handleFinish = () => {
    if (quizResult) {
      onComplete(quizResult);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 ${className || ""}`}
    >
      <CardHeader className="border-b border-slate-100 p-5 pb-4 sm:p-7 sm:pb-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <CardTitle className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm shadow-blue-900/15">
              <HelpCircle className="h-4.5 w-4.5 text-white" strokeWidth={2.1} />
            </div>
            <span>{title}</span>
          </CardTitle>

          {!isSubmitted && (
            <Badge
              variant="secondary"
              className="w-fit rounded-full border-none bg-slate-100 px-3 py-1 text-xs font-medium tabular-nums text-slate-600"
            >
              Frage {currentIndex + 1} von {questions.length}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-7">
        {/* State 1: Active Quiz View */}
        {!isSubmitted && currentQuestion && (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-1.5">
              <Progress
                value={progressPercentage}
                className="h-1.5 rounded-full bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-indigo-600"
              />
              <p className="text-right text-[11px] font-medium tabular-nums text-slate-400">
                {currentIndex + 1} / {questions.length}
              </p>
            </div>

            {/* Question text */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Frage {currentIndex + 1}
              </span>
              <h3 className="text-base font-medium leading-snug tracking-tight text-slate-900 sm:text-lg">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <QuizOptions
              options={currentQuestion.options}
              selectedOptionId={selectedAnswers[currentQuestion.id]}
              onSelectOption={handleOptionSelect}
            />
          </div>
        )}

        {/* State 2: Quiz Result View (Passed / Failed) */}
        {isSubmitted && quizResult && (
          <div className="flex flex-col items-center space-y-4 py-6 text-center">
            {quizResult.passed ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-emerald-600 ring-1 ring-inset ring-emerald-200">
                <Award className="h-8 w-8" strokeWidth={1.75} />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100/70 text-red-600 ring-1 ring-inset ring-red-200">
                <XCircle className="h-8 w-8" strokeWidth={1.75} />
              </div>
            )}

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                {quizResult.passed
                  ? "Herzlichen Glückwunsch, bestanden!"
                  : "Quiz nicht bestanden"}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                {quizResult.passed
                  ? `Sie haben ${quizResult.percentage}% erreicht (${quizResult.score}/${quizResult.totalQuestions}). Sehr gute Leistung.`
                  : `Sie haben ${quizResult.percentage}% erreicht (${quizResult.score}/${quizResult.totalQuestions}). Für den Abschluss sind mindestens ${passingScore}% erforderlich.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge
                variant={quizResult.passed ? "secondary" : "destructive"}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  quizResult.passed
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                Ergebnis: {quizResult.percentage}%
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-slate-200 bg-white px-3 py-1 text-sm text-slate-600"
              >
                Bestehensgrenze: {passingScore}%
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:p-6 sm:pt-4">
        {/* Navigation & Actions for Active Quiz */}
        {!isSubmitted && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={isFirstQuestion}
              className="w-full gap-1.5 rounded-xl border-slate-200 text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Zurück</span>
            </Button>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              {!isLastQuestion ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    )
                  }
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className="w-full gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/25 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 sm:w-auto"
                >
                  <span>Weiter</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className="w-full gap-1.5 rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 transition-all duration-200 hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Quiz abschicken</span>
                </Button>
              )}
            </div>
          </>
        )}

        {/* Result Action Buttons */}
        {isSubmitted && quizResult && (
          <div className="flex w-full flex-col justify-end gap-3 sm:flex-row">
            {!quizResult.passed && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRetry}
                className="w-full gap-2 rounded-xl border-slate-200 text-slate-700 transition-all duration-200 hover:bg-slate-100 sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Quiz wiederholen</span>
              </Button>
            )}

            {quizResult.passed && (
              <Button
                type="button"
                onClick={handleFinish}
                className="w-full gap-2 rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 transition-all duration-200 hover:bg-emerald-700 sm:w-auto"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Abschnitt abschließen</span>
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;