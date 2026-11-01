// components/shared/CourseProgressBar.tsx

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ProgressPercentage } from "@/types/course";

interface CourseProgressBarProps {
  progress: ProgressPercentage;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  progress,
  label = "Course Completion",
  showPercentage = true,
  className,
}) => {
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-muted-foreground">{label}</span>
        {showPercentage && (
          <span className="text-foreground font-semibold">{roundedProgress}%</span>
        )}
      </div>
      <Progress value={roundedProgress} className="h-2 w-full" />
    </div>
  );
};

export default CourseProgressBar;