'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  height?: string;
  id?: string;
}

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  height = 'h-2.5',
  id,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div id={id} className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label && <span className="font-sans">{label}</span>}
          {showPercentage && <span className="font-mono">{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <Progress
        value={clampedValue}
        className={height}
        indicatorClassName="duration-800 ease-out"
      />
    </div>
  );
}
