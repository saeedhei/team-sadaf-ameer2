import { Section } from '@/lib/types';
import { Lock, CheckCircle2, ChevronRight, HelpCircle, Film } from 'lucide-react';

interface SectionCardProps {
  section: Section;
  isCompleted: boolean;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect: () => void;
  sectionIndex: number;
  id?: string;
}

export default function SectionCard({
  section,
  isCompleted,
  isUnlocked,
  isActive,
  onSelect,
  sectionIndex,
  id,
}: SectionCardProps) {
  return (
    <div
      id={id}
      onClick={() => isUnlocked && onSelect()}
      className={`group border rounded-xl p-5 flex gap-4 transition-all duration-300 ${
        isActive
          ? 'border-natural-brand bg-natural-brand-light dark:border-blue-500 dark:bg-blue-950/10 ring-2 ring-natural-brand/10 dark:ring-blue-500/15'
          : isUnlocked
          ? 'border-natural-border dark:border-slate-800 hover:border-natural-brand/30 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40 cursor-pointer'
          : 'border-natural-border opacity-60 bg-slate-50/50 dark:bg-slate-950/20 cursor-not-allowed'
      }`}
    >
      {/* Index Badge or Lock */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm font-sans transition-all duration-200 ${
            isActive
              ? 'bg-natural-brand text-white shadow-md'
              : isCompleted
              ? 'bg-[#F2F4F2] text-[#4A5D4E] dark:bg-emerald-950/60 dark:text-emerald-400'
              : isUnlocked
              ? 'bg-natural-beige text-[#2D2D2D] dark:bg-slate-800 dark:text-slate-300'
              : 'bg-[#F5F2ED] text-[#9A9A92] dark:bg-slate-800 dark:text-slate-500'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : !isUnlocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <span>{sectionIndex + 1}</span>
          )}
        </div>
        <div className="w-0.5 grow bg-natural-border dark:bg-slate-800/80 my-2 group-last:hidden" />
      </div>

      {/* Main Details */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold text-[#9A9A92] uppercase tracking-wider">
            SECTION {sectionIndex + 1}
          </span>
          {isCompleted && (
            <span className="text-[10px] bg-[#F2F4F2] text-[#4A5D4E] dark:text-emerald-400 font-extrabold uppercase px-1.5 py-0.2 rounded-md font-mono">
              COMPLETED
            </span>
          )}
          {!isUnlocked && (
            <span className="text-[10px] bg-natural-beige text-[#7A7A70] dark:bg-slate-800 dark:text-slate-400 font-extrabold uppercase px-1.5 py-0.2 rounded-md font-mono">
              LOCKED
            </span>
          )}
        </div>

        <h4
          className={`text-base font-bold font-serif tracking-tight ${
            isActive ? 'text-natural-brand dark:text-[#4A5D4E]' : 'text-[#1A1A1A] dark:text-white'
          }`}
        >
          {section.title}
        </h4>

        <p className="text-xs text-[#7A7A70] dark:text-slate-400 font-sans leading-relaxed mt-1 line-clamp-2">
          {section.description}
        </p>

        {/* Action summary info row */}
        {isUnlocked && (
          <div className="flex items-center gap-3.5 mt-3.5 text-xs text-[#7A7A70] font-mono font-medium">
            <span className="flex items-center gap-1">
              <Film className="w-3.5 h-3.5" /> Media Lesson
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Assessment ({section.quiz.length} items)
            </span>
          </div>
        )}
      </div>

      {/* Right chevron for navigation indicators */}
      {isUnlocked && (
        <div className="self-center p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-[#7A7A70] transition-colors">
          <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      )}
    </div>
  );
}
