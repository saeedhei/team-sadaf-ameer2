

/**
 * Common content item types within a section
 */
export type ContentType = "video" | "quiz";

/**
 * Progress status for modules, sections, and items
 */
export type ItemStatus = "locked" | "unlocked" | "in_progress" | "completed";

/**
 * Progress percentage clamped between 0 and 100
 */
export type ProgressPercentage = number; // Represents 0 to 100

/**
 * Multiple-choice option for a quiz question
 */
export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean; // Optional for client side to prevent answer leaking in state
}

/**
 * Single quiz question entity
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
  points: number;
}

/**
 * Full quiz schema belonging to a lesson/section
 */
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

/**
 * Video lesson schema with metadata
 */
export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationInSeconds: number;
  formattedDuration: string; // e.g., "12:45"
  transcript?: string;
}

/**
 * Section item representing either a Video or a Quiz
 */
export interface SectionItem {
  id: string;
  title: string;
  type: ContentType;
  order: number;
  status: ItemStatus;
  video?: VideoLesson;
  quiz?: Quiz;
}

/**
 * Section grouping multiple lessons or quizzes within a Module
 */
export interface Section {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  order: number;
  status: ItemStatus;
  items: SectionItem[];
}

/**
 * Digital Literacy Badge or Reward Earned on Milestone Completion
 */
export interface Badge {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt?: string; // ISO date string
}

/**
 * Top-level Module entity for Digital Literacy Training
 */
export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  status: ItemStatus;
  badge?: Badge;
  sections: Section[];
}

/**
 * Top-level Course entity composing all training modules
 */
export interface Course {
  title: string;
  description?: string;
  modules: Module[];
}

/**
 * Quiz submission and performance record
 */
export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
}

/**
 * Tracks lesson-specific user interaction state
 */
export interface VideoProgress {
  videoId: string;
  lastWatchedPositionInSeconds: number;
  isCompleted: boolean;
}

/**
 * Global User Progress schema for the entire platform
 */
export interface UserProgress {
  userId: string;
  currentModuleId: string;
  currentSectionId: string;
  currentItemId: string;
  completedItemIds: string[];
  completedSectionIds: string[];
  completedModuleIds: string[];
  overallProgressPercentage: ProgressPercentage;
  videoProgressMap: Record<string, VideoProgress>; // Key: videoId
  quizResultsMap: Record<string, QuizResult>;      // Key: quizId
  earnedBadges: Badge[];
  updatedAt: string; // ISO date string
}