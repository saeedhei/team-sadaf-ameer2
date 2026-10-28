'use client';

import { useState, useEffect } from 'react';
import { modulesData } from '@/lib/modules-data';
import { Module, UserProgress } from '@/lib/types';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import ModuleCard from '@/components/module-card';
import SectionCard from '@/components/section-card';
import VideoPlayer from '@/components/video-player';
import Quiz from '@/components/quiz';
import CompletionDialog from '@/components/completion-dialog';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  ChevronLeft,
  CheckCircle2,
  ShieldAlert,
  Award,
  ArrowRight,
  Star,
  HelpCircle,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'verify_platform_progress';

export default function CourseApp() {
  // Navigation states
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core User Progress States
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [unlockedModules, setUnlockedModules] = useState<string[]>(['mod-1']);
  const [quizScores, setQuizScores] = useState<Record<string, { score: number; maxScore: number; passed: boolean }>>({});

  // Dialog celebration states
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [justCompletedModule, setJustCompletedModule] = useState<Module | null>(null);
  const [nextModuleToOpen, setNextModuleToOpen] = useState<Module | null>(null);

  // Initialize progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as UserProgress;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
        if (parsed.completedSections) setCompletedSections(parsed.completedSections);
        if (parsed.completedModules) {
          // If modules are completed, ensure subsequent ones are unlocked
          const unlocked = ['mod-1'];
          parsed.completedModules.forEach((mId) => {
            const mIdx = modulesData.findIndex((m) => m.id === mId);
            if (mIdx !== -1 && mIdx < modulesData.length - 1) {
              unlocked.push(modulesData[mIdx + 1].id);
            }
          });
          setUnlockedModules(Array.from(new Set(unlocked)));
        }
        if (parsed.quizScores) setQuizScores(parsed.quizScores);
      }
    } catch (e) {
      console.error('Failed to load user progress', e);
    }
  }, []);

  // Save progress changes to localStorage
  const saveProgress = (
    newCompletedSections: string[],
    newQuizScores: Record<string, { score: number; maxScore: number; passed: boolean }>
  ) => {
    try {
      // Determine completed modules based on sections completed
      const completedModules: string[] = [];
      modulesData.forEach((m) => {
        const allDone = m.sections.every((sec) => newCompletedSections.includes(sec.id));
        if (allDone) {
          completedModules.push(m.id);
        }
      });

      const data: UserProgress = {
        completedSections: newCompletedSections,
        completedModules,
        quizScores: newQuizScores,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  };

  // Calculations
  const totalSectionsCount = modulesData.reduce((acc, m) => acc + m.sections.length, 0);
  const completedSectionsCount = completedSections.length;
  const overallProgressPercent = totalSectionsCount > 0 ? (completedSectionsCount / totalSectionsCount) * 100 : 0;

  const activeModule = modulesData.find((m) => m.id === activeModuleId) || null;
  const activeSection = activeModule?.sections.find((s) => s.id === activeSectionId) || null;

  // Handles moving back to dashboard home
  const handleGoHome = () => {
    setActiveModuleId(null);
    setActiveSectionId(null);
  };

  // Selecting a module from the dashboard
  const handleSelectModule = (moduleId: string) => {
    const targetModule = modulesData.find((m) => m.id === moduleId);
    if (targetModule && targetModule.sections.length > 0) {
      setActiveModuleId(moduleId);

      // Select the first uncompleted section, or the first section
      const firstUncompleted = targetModule.sections.find((s) => !completedSections.includes(s.id));
      if (firstUncompleted) {
        setActiveSectionId(firstUncompleted.id);
      } else {
        setActiveSectionId(targetModule.sections[0].id);
      }
    }
  };

  // Navigating between sections in module
  const handleSelectSection = (moduleId: string, sectionId: string) => {
    setActiveModuleId(moduleId);
    setActiveSectionId(sectionId);
  };

  // Quiz completion callback
  const handleQuizComplete = (score: number, maxScore: number, passed: boolean) => {
    if (!activeSectionId) return;

    const updatedScores = {
      ...quizScores,
      [activeSectionId]: { score, maxScore, passed },
    };
    setQuizScores(updatedScores);
    saveProgress(completedSections, updatedScores);
  };

  // Mark section as completed and sequential unlocking triggers
  const handleMarkAsComplete = () => {
    if (!activeModule || !activeSection) return;

    const newCompleted = Array.from(new Set([...completedSections, activeSection.id]));
    setCompletedSections(newCompleted);
    saveProgress(newCompleted, quizScores);

    // Find current section index
    const sectionIndex = activeModule.sections.findIndex((s) => s.id === activeSection.id);

    // Check if there is a next section in the module
    if (sectionIndex < activeModule.sections.length - 1) {
      const nextSection = activeModule.sections[sectionIndex + 1];
      // Automatically navigate to next section
      setActiveSectionId(nextSection.id);
    } else {
      // Last section in the module completed!
      // This module is completed. Unlock the next module if any.
      const moduleIndex = modulesData.findIndex((m) => m.id === activeModule.id);
      const hasNextModule = moduleIndex < modulesData.length - 1;

      if (hasNextModule) {
        const nextModule = modulesData[moduleIndex + 1];
        const newUnlocked = Array.from(new Set([...unlockedModules, nextModule.id]));
        setUnlockedModules(newUnlocked);

        // Setup celebration dialog
        setJustCompletedModule(activeModule);
        setNextModuleToOpen(nextModule);
        setIsCompletionOpen(true);
      } else {
        // Completed the entire course
        setJustCompletedModule(activeModule);
        setNextModuleToOpen(null);
        setIsCompletionOpen(true);
      }
    }
  };

  // Callback from completion dialog to start next module
  const handleProceedToNextModule = () => {
    if (nextModuleToOpen) {
      setActiveModuleId(nextModuleToOpen.id);
      setActiveSectionId(nextModuleToOpen.sections[0].id);
    } else {
      handleGoHome();
    }
  };

  // Check if a specific section is unlocked
  const isSectionUnlocked = (moduleId: string, sectionIndex: number): boolean => {
    if (!unlockedModules.includes(moduleId)) return false;
    if (sectionIndex === 0) return true;

    const targetModule = modulesData.find((m) => m.id === moduleId);
    if (!targetModule) return false;

    const prevSection = targetModule.sections[sectionIndex - 1];
    return completedSections.includes(prevSection.id);
  };

  return (
    <div
      id="app-root"
      className="min-h-screen bg-[#F9F9F7] dark:bg-slate-950 text-[#2D2D2D] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200"
    >
      {/* Top Navbar */}
      <Navbar
        overallProgress={overallProgressPercent}
        completedSectionsCount={completedSectionsCount}
        totalSections={totalSectionsCount}
        onLogoClick={handleGoHome}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex relative">
        {/* Persistent/Collapsible Sidebar - rendered in course screens only */}
        {activeModuleId !== null && (
          <Sidebar
            modules={modulesData}
            activeModuleId={activeModuleId}
            activeSectionId={activeSectionId}
            completedSections={completedSections}
            unlockedModules={unlockedModules}
            onSelectSection={handleSelectSection}
            onGoHome={handleGoHome}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

        {/* Dynamic View Panel */}
        <main className="flex-1 min-w-0 flex flex-col">
          <AnimatePresence mode="wait">
            {/* VIEW 1: HOME TRAINING DASHBOARD */}
            {activeModuleId === null ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="p-6 md:p-8 xl:p-10 max-w-7xl mx-auto w-full space-y-10"
              >
                {/* Hero Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-[#4A5D4E] text-white p-8 md:p-12 border border-natural-border shadow-xl">
                  {/* Glowing decorative lights */}
                  <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/3 -ml-24 -mb-24 w-80 h-80 rounded-full bg-natural-beige/10 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white/90 font-mono mb-6 uppercase">
                      <Star className="w-4 h-4 fill-current animate-spin-slow text-white" />
                      <span>Elite Cyber Security Training</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight leading-tight text-white">
                      Verify & Validate: <br className="hidden sm:inline" />
                      <span className="text-white">Digital Literacy Fundamentals</span>
                    </h2>

                    <p className="text-sm md:text-base text-white/90 mt-4 leading-relaxed font-sans font-medium">
                      Equip yourself with elite digital hygiene. Learn to dismantle disinformation, verify deepfakes,
                      inspect metadata, and neutralize cognitive filter bubbles.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 items-center">
                      <button
                        onClick={() => handleSelectModule('mod-1')}
                        className="px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <span>Launch Course Intro</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="text-xs font-semibold text-white/85 font-mono flex items-center gap-2 bg-black/25 px-3 py-2 rounded-lg border border-white/10">
                        <GraduationCap className="w-4 h-4 text-white/90" />
                        <span>2 Full-scale Curated Labs Unlocked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Stats Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-natural-border dark:border-slate-850 flex items-center gap-4 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-natural-brand-light dark:bg-blue-950/40 text-natural-brand dark:text-blue-400 flex items-center justify-center font-bold">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A9A92] font-mono">Completed Units</h4>
                      <div className="text-lg font-bold text-[#1A1A1A] dark:text-white mt-1 leading-none">
                        {completedSectionsCount} <span className="text-sm text-[#7A7A70] font-medium">/ {totalSectionsCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-natural-border dark:border-slate-850 flex items-center gap-4 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-[#F2F4F2] dark:bg-emerald-950/40 text-natural-brand dark:text-emerald-400 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A9A92] font-mono">Lab Completion</h4>
                      <div className="text-lg font-bold text-[#1A1A1A] dark:text-white mt-1 leading-none">
                        {overallProgressPercent === 100 ? 'Certified' : `${Math.round(overallProgressPercent)}%`}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-natural-border dark:border-slate-850 flex items-center gap-4 shadow-xs sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 rounded-xl bg-natural-beige dark:bg-amber-950/40 text-[#F27D26] dark:text-amber-400 flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A9A92] font-mono">Security Ranking</h4>
                      <div className="text-lg font-bold text-[#1A1A1A] dark:text-white mt-1 leading-none">
                        {completedSectionsCount >= 4 ? 'Disinfo Specialist' : completedSectionsCount >= 2 ? 'Investigator' : 'Cadet'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Course Modules */}
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight font-serif text-natural-text-dark dark:text-white">
                        Training Roadmap Modules
                      </h3>
                      <p className="text-xs text-[#7A7A70] mt-1 font-sans">
                        Complete courses sequentially. High-fidelity verification exercises will unlock dynamically.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modulesData.map((m) => {
                      const isUnlocked = unlockedModules.includes(m.id);
                      const isCompleted = m.sections.every((sec) => completedSections.includes(sec.id));
                      const countCompleted = m.sections.filter((sec) => completedSections.includes(sec.id)).length;

                      return (
                        <ModuleCard
                          key={m.id}
                          module={m}
                          isUnlocked={isUnlocked}
                          isCompleted={isCompleted}
                          completedSectionsCount={countCompleted}
                          onSelect={() => handleSelectModule(m.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* VIEW 2: ACTIVE COURSE VIEW (SPLIT SCREEN CONTENT PANEL) */
              <motion.div
                key="course-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                {activeSection ? (
                  <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-0 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {/* Left Column (Lesson content scroll) */}
                    <div className="xl:col-span-8 p-6 md:p-8 space-y-8 border-r border-natural-border dark:border-slate-850">
                      {/* Back button & Breadcrumb header */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                          onClick={handleGoHome}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A7A70] dark:text-slate-400 hover:text-[#1A1A1A] dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-900 border border-natural-border dark:border-slate-850 px-3 py-1.5 rounded-lg shadow-xs cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Exit to Dashboard</span>
                        </button>

                        <div className="flex items-center gap-2 text-xs font-medium font-sans text-slate-500">
                          <span className="truncate max-w-[120px] sm:max-w-[200px]">{activeModule?.title}</span>
                          <span className="text-slate-300">/</span>
                          <span className="text-slate-950 dark:text-white font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                            {activeSection.title}
                          </span>
                        </div>
                      </div>

                      {/* Video Player */}
                      <VideoPlayer
                        videoUrl={activeSection.videoUrl}
                        title={activeSection.title}
                        onWatchedComplete={() => {
                          // Optional hooks can go here
                        }}
                      />

                      {/* Section Content */}
                      <div className="space-y-6">
                        <div className="border-b border-natural-border dark:border-slate-850 pb-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="primary">{activeModule?.category}</Badge>
                            <span className="text-xs text-[#7A7A70] font-mono font-semibold">15 MIN LESSON READ</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1A1A] dark:text-white tracking-tight">
                            {activeSection.title}
                          </h2>
                          <p className="text-sm text-[#7A7A70] mt-2 font-sans font-medium">{activeSection.description}</p>
                        </div>

                        {/* Learning objectives/Key points badge checklist */}
                        <div className="p-6 bg-white dark:bg-slate-900/60 rounded-2xl border border-natural-border dark:border-slate-800/80">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A9A92] font-mono mb-4 flex items-center gap-1.5">
                            <ShieldAlert className="w-4.5 h-4.5 text-natural-brand animate-pulse" />
                            <span>Core Objectives & Key Points</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activeSection.keyPoints.map((pt, idx) => (
                              <div key={idx} className="flex gap-2.5 text-xs text-[#2D2D2D] dark:text-slate-300 font-sans leading-relaxed">
                                <div className="p-0.5 rounded-full bg-[#F2F4F2] text-[#4A5D4E] dark:text-emerald-400 shrink-0 h-fit mt-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Long-form Lesson Body */}
                        <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-sans space-y-5">
                          {activeSection.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('###')) {
                              const headingText = paragraph.replace('###', '').trim();
                              return (
                                <h3 key={index} className="text-lg md:text-xl font-bold font-sans text-slate-900 dark:text-white tracking-tight pt-3">
                                  {headingText}
                                </h3>
                              );
                            }
                            if (paragraph.startsWith('*')) {
                              return (
                                <ul key={index} className="list-disc pl-5 space-y-2 text-xs md:text-sm font-sans">
                                  {paragraph.split('\n').map((li, liIdx) => (
                                    <li key={liIdx} className="pl-1">
                                      {li.replace('*', '').trim().replace('**', '').replace('**', '')}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            return (
                              <p key={index} className="text-xs md:text-sm">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive Section Quiz Assessment */}
                      <div id="assessment-block" className="pt-6 border-t border-natural-border dark:border-slate-850">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold font-serif text-[#1A1A1A] dark:text-white flex items-center gap-2">
                            <HelpCircle className="w-5.5 h-5.5 text-natural-brand" />
                            <span>Section Assessment</span>
                          </h3>
                          <p className="text-xs text-slate-500 font-sans mt-1">
                            Complete this interactive assessment with a passing score of 70% to verify your digital credentials.
                          </p>
                        </div>

                        <Quiz
                          questions={activeSection.quiz}
                          sectionId={activeSection.id}
                          onQuizComplete={handleQuizComplete}
                          savedScore={quizScores[activeSection.id] || null}
                        />
                      </div>

                      {/* Mark as complete buttons */}
                      <div className="pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-xs font-sans max-w-sm">
                          {quizScores[activeSection.id]?.passed ? (
                            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-semibold">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                              <span>Assessment passed! You can now secure this section&apos;s completion.</span>
                            </span>
                          ) : (
                            <span className="text-amber-700 dark:text-amber-400 flex items-center gap-2 font-medium">
                              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                              <span>Complete the section assessment above with 70%+ score to mark this unit as complete.</span>
                            </span>
                          )}
                        </div>

                        <button
                          disabled={!quizScores[activeSection.id]?.passed || completedSections.includes(activeSection.id)}
                          onClick={handleMarkAsComplete}
                          className={`px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 ${
                            completedSections.includes(activeSection.id)
                              ? 'bg-[#F2F4F2] border border-[#E5E5DF] text-[#4A5D4E] dark:bg-emerald-950/25 dark:border-emerald-900/50 dark:text-[#F2F4F2] font-bold'
                              : quizScores[activeSection.id]?.passed
                              ? 'bg-natural-brand hover:bg-[#3D4D41] text-white shadow-emerald-500/10 cursor-pointer animate-bounce-slow'
                              : 'bg-slate-100 border border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          {completedSections.includes(activeSection.id) ? (
                            <>
                              <CheckCircle2 className="w-4.5 h-4.5" />
                              <span>Completed & Certified</span>
                            </>
                          ) : (
                            <>
                              <span>Mark Section Complete</span>
                              <ArrowRight className="w-4.5 h-4.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right Column (Sidebar map / sections timeline overview) */}
                    <div className="xl:col-span-4 p-6 md:p-8 space-y-6 bg-white border-l border-natural-border dark:bg-slate-950/20 max-h-[calc(100vh-4rem)] overflow-y-auto">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#9A9A92] font-mono">Module Content Map</h4>
                        <p className="text-xs text-[#7A7A70] mt-1 font-sans">Complete each learning target sequentially.</p>
                      </div>

                      <div className="space-y-4">
                        {activeModule?.sections.map((sec, idx) => (
                          <SectionCard
                            key={sec.id}
                            section={sec}
                            sectionIndex={idx}
                            isCompleted={completedSections.includes(sec.id)}
                            isUnlocked={isSectionUnlocked(activeModule.id, idx)}
                            isActive={activeSectionId === sec.id}
                            onSelect={() => handleSelectSection(activeModule.id, sec.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                    <GraduationCap className="w-16 h-16 text-slate-300 mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold font-sans">Unit Not Found</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">Please select a valid module section from the left navigation tree.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Module Completion Dialog with full celebration animation */}
      <CompletionDialog
        isOpen={isCompletionOpen}
        onClose={() => setIsCompletionOpen(false)}
        moduleTitle={justCompletedModule?.title || ''}
        nextModuleTitle={nextModuleToOpen?.title || null}
        onNextModule={handleProceedToNextModule}
      />
    </div>
  );
}
