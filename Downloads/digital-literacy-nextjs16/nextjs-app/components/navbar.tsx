'use client';

import { GraduationCap, Menu, X, ShieldAlert } from 'lucide-react';
import ProgressBar from '@/components/progress-bar';

interface NavbarProps {
  overallProgress: number;
  completedSectionsCount: number;
  totalSections: number;
  onLogoClick: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  id?: string;
}

export default function Navbar({
  overallProgress,
  completedSectionsCount,
  totalSections,
  onLogoClick,
  isSidebarOpen,
  setIsSidebarOpen,
  id,
}: NavbarProps) {
  return (
    <header
      id={id}
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-natural-border dark:border-slate-800 transition-colors duration-200"
    >
      <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Brand Area */}
        <div className="flex items-center gap-3">
          {/* Hamburger toggle for mobile sidebar */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-[#7A7A70] hover:text-[#1A1A1A] dark:text-slate-400 dark:hover:text-slate-200 hover:bg-[#F2F4F2] dark:hover:bg-slate-800 lg:hidden focus:outline-hidden transition-colors"
            aria-label="Toggle navigation drawer"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Platform Brand Title */}
          <div onClick={onLogoClick} className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div className="flex items-center justify-center w-9.5 h-9.5 rounded-xl bg-natural-brand text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-natural-text-dark dark:text-white tracking-tight leading-none group-hover:text-natural-brand transition-colors flex items-center gap-1.5">
                DIGITAL<span>ACADEMY</span>
              </h1>
              <span className="text-[10px] text-[#9A9A92] font-bold tracking-wider font-mono uppercase block mt-0.5 leading-none">
                Digital Literacy Fundamentals
              </span>
            </div>
          </div>
        </div>

        {/* Mid Header overall course progress bar (Desktop only) */}
        <div className="hidden md:flex items-center gap-6 max-w-sm lg:max-w-md w-full ml-auto mr-4">
          <div className="w-full">
            <ProgressBar
              value={overallProgress}
              label="Overall Course Progress"
              showPercentage={true}
              height="h-1.5"
            />
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 shrink-0 font-sans">
            <div className="text-right">
              <div className="text-xs font-bold font-mono text-slate-950 dark:text-white leading-none">
                {completedSectionsCount}/{totalSections}
              </div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider font-mono">
                Items Complete
              </span>
            </div>
          </div>
        </div>

        {/* Right User Settings Panel */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-natural-beige dark:bg-slate-800/60 px-3 py-1.5 rounded-full border border-natural-border dark:border-slate-800/50 text-xs font-semibold text-[#4A5D4E]">
            <ShieldAlert className="w-3.5 h-3.5 text-natural-brand animate-pulse" />
            <span className="font-mono">Vetting Cadet</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8.5 h-8.5 rounded-full bg-natural-brand text-white flex items-center justify-center font-bold text-xs shadow-inner">
              SH
            </div>
            <div className="hidden lg:block text-left leading-tight font-sans">
              <div className="text-xs font-bold text-natural-text-dark dark:text-white">Saeed Heidarizarei</div>
              <span className="text-[10px] text-[#7A7A70] font-mono">saeed.heidarizarei@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
