// components/quiz/QuizOptions.tsx

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { QuizOption } from "@/types/course";

interface QuizOptionsProps {
  options: QuizOption[];
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
  className?: string;
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  options,
  selectedOptionId,
  onSelectOption,
  disabled = false,
  className,
}) => {
  return (
    <RadioGroup
      value={selectedOptionId}
      onValueChange={onSelectOption}
      disabled={disabled}
      className={cn("space-y-2.5 w-full", className)}
    >
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;

        return (
          <div
            key={option.id}
            onClick={() => {
              if (!disabled) onSelectOption(option.id);
            }}
            className={cn(
              "flex items-center space-x-3 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer",
              isSelected
                ? "bg-primary/5 border-primary ring-1 ring-primary/20"
                : "bg-card border-border hover:bg-accent/50 hover:border-border/80",
              disabled && "cursor-not-allowed opacity-60 hover:bg-card hover:border-border"
            )}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="shrink-0"
            />
            <Label
              htmlFor={option.id}
              className="text-xs sm:text-sm font-medium leading-relaxed text-foreground cursor-pointer flex-grow"
            >
              {option.text}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default QuizOptions;