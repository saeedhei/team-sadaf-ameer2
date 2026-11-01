export type QuestionType = 'single-choice' | 'multiple-choice' | 'true-false';

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswers: number[]; // indices of correct options
  explanation: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // URL for embedded video placeholder
  content: string; // Long form text / markdown
  keyPoints: string[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string; // e.g., "30 mins"
  sections: Section[];
}

export interface UserProgress {
  completedSections: string[]; // sectionIds
  completedModules: string[]; // moduleIds
  quizScores: Record<string, { score: number; maxScore: number; passed: boolean }>; // sectionId -> quiz score
}
