"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ModuleAccordion from "@/components/modules/ModuleAccordion";
import VideoPlayer from "@/components/video/VideoPlayer";
import QuizCard from "@/components/quiz/QuizCard";
import CompletionDialog from "@/components/shared/CompletionDialog";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function DashboardPage() {
  const {
    course,
    activeItem,
    activeModuleId,
    completedItemIds,
    overallProgress,
    latestEarnedBadge,
    showCompletionDialog,
    onSelectItem,
    onVideoComplete,
    onQuizComplete,
    closeCompletionDialog,
  } = useCourseProgress();

  const activeModule = course.modules.find((m) => m.id === activeModuleId);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans antialiased">
      <Header
        courseTitle={course.title}
        currentModuleName={activeModule?.title}
        overallProgress={overallProgress}
        latestEarnedBadge={latestEarnedBadge}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar
          modules={course.modules}
          activeItemId={activeItem?.id ?? ""}
          activeModuleId={activeModuleId}
          completedItemIds={completedItemIds}
          onSelectItem={onSelectItem}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
          {activeItem?.video && (
            <VideoPlayer
              video={activeItem.video}
              isCompleted={activeItem.status === "completed"}
              onComplete={onVideoComplete}
            />
          )}

          {activeItem?.quiz && (
            <QuizCard
              quizId={activeItem.quiz.id}
              title={activeItem.quiz.title}
              questions={activeItem.quiz.questions}
              passingScore={activeItem.quiz.passingScorePercentage}
              isCompleted={activeItem.status === "completed"}
              onComplete={onQuizComplete}
            />
          )}

          {!activeItem && (
            <ModuleAccordion
              modules={course.modules}
              activeItemId=""
              completedItemIds={completedItemIds}
              onSelectItem={onSelectItem}
            />
          )}
        </main>
      </div>

      <CompletionDialog
        open={showCompletionDialog}
        onOpenChange={closeCompletionDialog}
        progressPercentage={overallProgress}
        onContinue={closeCompletionDialog}
      />
    </div>
  );
}
