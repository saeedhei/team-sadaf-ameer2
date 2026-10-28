import { Module } from '@/lib/types';
import { Lock, BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ModuleCardProps {
  module: Module;
  isUnlocked: boolean;
  isCompleted: boolean;
  completedSectionsCount: number;
  onSelect: () => void;
  id?: string;
}

export default function ModuleCard({
  module,
  isUnlocked,
  isCompleted,
  completedSectionsCount,
  onSelect,
  id,
}: ModuleCardProps) {
  const totalSections = module.sections.length;

  return (
    <div
      id={id}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900 ${
        isUnlocked
          ? 'border-natural-border dark:border-slate-800 hover:border-natural-brand/50 hover:shadow-lg dark:hover:border-blue-900/50'
          : 'border-slate-100 dark:border-slate-900 opacity-75 shadow-xs'
      }`}
    >
      {/* Decorative background aura for unlocked items on hover */}
      {isUnlocked && (
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 rounded-full bg-linear-to-br from-natural-brand/5 to-natural-beige/10 blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
      )}

      {/* Header Bar */}
      <div className="p-6 md:p-8 flex flex-col h-full justify-between">
        <div>
          {/* Badges / Meta row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <Badge variant={isCompleted ? 'success' : isUnlocked ? 'primary' : 'locked'}>
              {module.category}
            </Badge>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#7A7A70]" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#7A7A70]" />
                {totalSections} {totalSections === 1 ? 'Section' : 'Sections'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold font-serif text-[#1A1A1A] dark:text-white tracking-tight leading-snug group-hover:text-natural-brand dark:group-hover:text-natural-brand-light transition-colors">
            {module.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#7A7A70] dark:text-slate-300 mt-2.5 font-sans leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-8 pt-5 border-t border-[#E5E5DF] dark:border-slate-800/80 flex items-center justify-between">
          {/* Progress / Status display */}
          <div className="text-xs font-sans">
            {isCompleted ? (
              <span className="flex items-center gap-1.5 text-natural-brand dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-natural-brand" />
                <span>All Core Completed</span>
              </span>
            ) : isUnlocked ? (
              <span className="text-[#7A7A70] dark:text-slate-400 font-semibold font-mono">
                {completedSectionsCount}/{totalSections} Sections Complete
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Prerequisites Required</span>
              </span>
            )}
          </div>

          {/* Action Button */}
          {isUnlocked ? (
            <button
              onClick={onSelect}
              className="flex items-center gap-1 text-xs font-bold text-natural-brand hover:text-natural-brand-hover dark:text-blue-400 dark:hover:text-blue-300 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>{completedSectionsCount > 0 ? 'Resume Module' : 'Begin Module'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="flex items-center gap-1 text-xs font-bold text-slate-300 dark:text-slate-600">
              <span>Locked</span>
              <Lock className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
