'use client';

import { Module } from '@/lib/types';
import { Home, Lock, CheckCircle2, ChevronDown, PlayCircle, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  modules: Module[];
  activeModuleId: string | null;
  activeSectionId: string | null;
  completedSections: string[];
  unlockedModules: string[];
  onSelectSection: (moduleId: string, sectionId: string) => void;
  onGoHome: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  id?: string;
}

export default function Sidebar({
  modules,
  activeModuleId,
  activeSectionId,
  completedSections,
  unlockedModules,
  onSelectSection,
  onGoHome,
  isSidebarOpen,
  setIsSidebarOpen,
  id,
}: SidebarProps) {
  // Store expanded modules state (default expand active module)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeModuleId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- auto-expand the module when navigation changes it
      setExpandedModules((prev) => ({
        ...prev,
        [activeModuleId]: true,
      }));
    }
  }, [activeModuleId]);

  const toggleExpand = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Check if a section is unlocked
  const isSectionUnlocked = (moduleId: string, sectionIndex: number): boolean => {
    // Parent module must be unlocked
    if (!unlockedModules.includes(moduleId)) return false;

    // First section is always unlocked
    if (sectionIndex === 0) return true;

    // Subsequent sections are unlocked if the previous one is completed
    const currentModule = modules.find((m) => m.id === moduleId);
    if (!currentModule) return false;

    const prevSection = currentModule.sections[sectionIndex - 1];
    return completedSections.includes(prevSection.id);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        id={id}
        className={`fixed lg:sticky top-16 left-0 z-40 w-80 lg:w-76 xl:w-80 h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 border-r border-slate-200/70 dark:border-slate-800/90 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 md:p-6 flex flex-col gap-6">
          {/* Navigation Home / Dashboard Option */}
          <button
            onClick={() => {
              onGoHome();
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeModuleId === null
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 dark:shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-4.5 h-4.5" />
            <span className="font-sans">Training Dashboard</span>
          </button>

          {/* Module Hierarchy Section */}
          <div>
            <span className="text-[11px] font-semibold tracking-widest font-sans text-slate-400 dark:text-slate-500 uppercase block mb-4 px-1.5">
              COURSE CONTENT
            </span>

            <div className="space-y-4">
              {modules.map((m, mIdx) => {
                const isModuleUnlocked = unlockedModules.includes(m.id);
                const isModuleCompleted = m.sections.every((sec) => completedSections.includes(sec.id));
                const isExpanded = !!expandedModules[m.id];
                const isActiveModule = activeModuleId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`rounded-xl overflow-hidden bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-shadow duration-200 ${
                      isActiveModule && !isExpanded ? 'ring-1 ring-indigo-500/30 dark:ring-indigo-400/30' : ''
                    }`}
                  >
                    {/* Collapsible Module Header */}
                    <div
                      onClick={() => isModuleUnlocked && toggleExpand(m.id)}
                      className={`flex items-center justify-between p-4 ${
                        isModuleUnlocked
                          ? 'cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                          : 'cursor-not-allowed opacity-60'
                      } ${
                        isActiveModule && isExpanded
                          ? 'bg-indigo-50/40 dark:bg-indigo-950/20'
                          : ''
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Lock / Unlocked Indicator */}
                        <div className="mt-0.5 shrink-0">
                          {isModuleCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                          ) : !isModuleUnlocked ? (
                            <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          ) : (
                            <BookOpen
                              className={`w-5 h-5 ${
                                isActiveModule
                                  ? 'text-indigo-600 dark:text-indigo-400'
                                  : 'text-slate-400 dark:text-slate-500'
                              }`}
                            />
                          )}
                        </div>
                        <div className="text-left font-sans min-w-0">
                          <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase leading-none">
                            MODULE {mIdx + 1}
                          </span>
                          <h4
                            className={`text-sm font-semibold leading-tight truncate mt-1 ${
                              isActiveModule
                                ? 'text-indigo-700 dark:text-indigo-300'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {m.title}
                          </h4>
                        </div>
                      </div>

                      {isModuleUnlocked && (
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ease-in-out ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>

                    {/* Collapsed Sections list */}
                    {isModuleUnlocked && isExpanded && (
                      <div className="bg-slate-50/60 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60 p-2 space-y-1">
                        {m.sections.map((sec, sIdx) => {
                          const isSecUnlocked = isSectionUnlocked(m.id, sIdx);
                          const isSecCompleted = completedSections.includes(sec.id);
                          const isSecActive = activeSectionId === sec.id;

                          return (
                            <button
                              key={sec.id}
                              disabled={!isSecUnlocked}
                              onClick={() => {
                                onSelectSection(m.id, sec.id);
                                setIsSidebarOpen(false); // Close mobile drawer on pick
                              }}
                              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                                isSecActive
                                  ? 'bg-indigo-50 dark:bg-indigo-950/30 border-l-2 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-semibold'
                                  : isSecUnlocked
                                  ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                                  : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isSecCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                ) : !isSecUnlocked ? (
                                  <Lock className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                                ) : (
                                  <PlayCircle
                                    className={`w-4 h-4 ${
                                      isSecActive
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-slate-400 dark:text-slate-500'
                                    }`}
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0 font-sans">
                                <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-0.5">
                                  Section {sIdx + 1}
                                </span>
                                <span className="truncate block leading-tight text-sm">
                                  {sec.title}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}