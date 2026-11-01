"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { initialCourse } from "@/data/courseData";
import {
  Course,
  Module,
  QuizResult,
  Section,
  SectionItem,
} from "@/types/course";

const LOCAL_STORAGE_KEY = "digital_literacy_course_progress";

/**
 * Finds a section item by id anywhere in the course, along with its
 * owning section and module.
 */
function findItemLocation(
  course: Course,
  itemId: string
): { module: Module; section: Section; item: SectionItem } | null {
  for (const courseModule of course.modules) {
    for (const section of courseModule.sections) {
      const item = section.items.find((i) => i.id === itemId);
      if (item) {
        return { module: courseModule, section, item };
      }
    }
  }
  return null;
}

/**
 * Returns the ids of every course-wide "unlocked" item, in course order,
 * used to pick a sensible default active item.
 */
function findFirstItem(course: Course): SectionItem | null {
  for (const courseModule of course.modules) {
    for (const section of courseModule.sections) {
      if (section.items.length > 0) return section.items[0];
    }
  }
  return null;
}

/**
 * Immutably marks a section item (found by video id or quiz id) as
 * completed, then re-evaluates module completion and unlocks the next
 * module if every item in the current module is now complete.
 */
function markItemCompleted(
  course: Course,
  predicate: (item: SectionItem) => boolean
): Course {
  const withItemMarked: Module[] = course.modules.map((courseModule) => ({
    ...courseModule,
    sections: courseModule.sections.map((section) => ({
      ...section,
      items: section.items.map((item): SectionItem =>
        predicate(item) ? { ...item, status: "completed" } : item
      ),
    })),
  }));

  const finalModules: Module[] = [];

  for (let index = 0; index < withItemMarked.length; index += 1) {
    const courseModule = withItemMarked[index];
    const allItems = courseModule.sections.flatMap((s) => s.items);
    const isModuleComplete =
      allItems.length > 0 && allItems.every((i) => i.status === "completed");

    finalModules.push({
      ...courseModule,
      status: isModuleComplete ? "completed" : courseModule.status,
    });

    const nextModule = withItemMarked[index + 1];
    if (isModuleComplete && nextModule && nextModule.status === "locked") {
      withItemMarked[index + 1] = {
        ...nextModule,
        status: "unlocked",
        sections: nextModule.sections.map((section) => ({
          ...section,
          status: "unlocked",
          items: section.items.map((item): SectionItem => ({
            ...item,
            status: "unlocked",
          })),
        })),
      };
    }
  }

  return { ...course, modules: finalModules };
}

export function useCourseProgress() {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [activeItemId, setActiveItemId] = useState<string>(
    () => findFirstItem(initialCourse)?.id ?? ""
  );
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: Course = JSON.parse(saved);
        setCourse(parsed);
        setActiveItemId((current) => current || findFirstItem(parsed)?.id || "");
      }
    } catch (e) {
      console.error("Failed to load saved course progress", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Persist progress whenever it changes (after the initial load)
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(course));
    } catch (e) {
      console.error("Failed to save course progress", e);
    }
  }, [course, hasLoaded]);

  const activeLocation = useMemo(
    () => findItemLocation(course, activeItemId),
    [course, activeItemId]
  );

  const { completedItemIds, totalItems } = useMemo(() => {
    const allItems = course.modules.flatMap((m) =>
      m.sections.flatMap((s) => s.items)
    );
    return {
      completedItemIds: allItems
        .filter((i) => i.status === "completed")
        .map((i) => i.id),
      totalItems: allItems.length,
    };
  }, [course]);

  const overallProgress = useMemo(
    () =>
      totalItems > 0
        ? Math.round((completedItemIds.length / totalItems) * 100)
        : 0,
    [completedItemIds.length, totalItems]
  );

  const latestEarnedBadge = useMemo(() => {
    const completedModulesWithBadge = course.modules.filter(
      (m) => m.status === "completed" && m.badge
    );
    return completedModulesWithBadge.at(-1)?.badge;
  }, [course.modules]);

  const handleSelectItem = useCallback((itemId: string) => {
    setActiveItemId(itemId);
  }, []);

  const handleVideoComplete = useCallback((videoId: string) => {
    setCourse((prev) =>
      markItemCompleted(prev, (item) => item.video?.id === videoId)
    );
  }, []);

  const handleQuizComplete = useCallback((result: QuizResult) => {
    if (!result.passed) return;
    setCourse((prev) =>
      markItemCompleted(prev, (item) => item.quiz?.id === result.quizId)
    );
    setShowCompletionDialog(true);
  }, []);

  const closeCompletionDialog = useCallback(() => {
    setShowCompletionDialog(false);
  }, []);

  return {
    course,
    activeItem: activeLocation?.item ?? null,
    activeModuleId: activeLocation?.module.id ?? course.modules[0]?.id ?? "",
    completedItemIds,
    overallProgress,
    latestEarnedBadge,
    showCompletionDialog,
    onSelectItem: handleSelectItem,
    onVideoComplete: handleVideoComplete,
    onQuizComplete: handleQuizComplete,
    closeCompletionDialog,
  };
}
