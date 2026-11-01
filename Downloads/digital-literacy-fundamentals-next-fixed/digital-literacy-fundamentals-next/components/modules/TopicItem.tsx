// components/modules/TopicItem.tsx

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, PlayCircle, HelpCircle, Clock } from "lucide-react";
import { SectionItem, ItemStatus } from "@/types/course";

interface TopicItemProps {
  item: SectionItem;
  status: ItemStatus;
  isActive?: boolean;
  onSelect?: (itemId: string, itemType: SectionItem["type"]) => void;
  className?: string;
}

export const TopicItem: React.FC<TopicItemProps> = ({
  item,
  status,
  isActive = false,
  onSelect,
  className,
}) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  // Optional field — rendered only when present on the underlying data,
  // without altering the SectionItem type contract.
  const description = (item as { description?: string }).description;

  const handleClick = () => {
    if (!isLocked && onSelect) {
      onSelect(item.id, item.type);
    }
  };

  return (
    <motion.button
      type="button"
      whileTap={isLocked ? undefined : { scale: 0.99 }}
      onClick={handleClick}
      disabled={isLocked}
      className={cn(
        "w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-left border transition-all duration-200",
        isActive
          ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-600/25"
          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm",
        isLocked &&
          "cursor-not-allowed opacity-60 bg-slate-50 border-slate-200 hover:bg-slate-50 hover:shadow-none",
        className
      )}
    >
      {/* Left side: Icon, Title & Description */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-xl shrink-0 transition-colors",
            isActive
              ? "bg-white/15"
              : isLocked
              ? "bg-slate-100"
              : isCompleted
              ? "bg-emerald-50"
              : "bg-blue-50"
          )}
        >
          {isLocked ? (
            <Lock className="h-4 w-4 text-slate-400" />
          ) : item.type === "video" ? (
            <PlayCircle
              className={cn(
                "h-4 w-4",
                isActive
                  ? "text-white"
                  : isCompleted
                  ? "text-emerald-500"
                  : "text-blue-600"
              )}
            />
          ) : (
            <HelpCircle
              className={cn(
                "h-4 w-4",
                isActive
                  ? "text-white"
                  : isCompleted
                  ? "text-emerald-500"
                  : "text-blue-600"
              )}
            />
          )}
        </div>

        <div className="min-w-0 space-y-0.5">
          <p
            className={cn(
              "truncate text-[13px] font-medium tracking-tight",
              isActive ? "text-white" : "text-slate-800"
            )}
          >
            {item.title}
          </p>
          {description && (
            <p
              className={cn(
                "truncate text-[11.5px]",
                isActive ? "text-white/75" : "text-slate-400"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right side: Duration, Status Badge, or Check Icon */}
      <div className="flex items-center gap-2.5 shrink-0">
        {item.video?.formattedDuration && (
          <span
            className={cn(
              "flex items-center gap-1 text-[10.5px] tabular-nums",
              isActive ? "text-white/80" : "text-slate-400"
            )}
          >
            <Clock className="h-3 w-3" />
            {item.video.formattedDuration}
          </span>
        )}

        {isLocked ? (
          <Badge
            variant="outline"
            className="text-[9px] py-0 px-2 h-5 border-slate-300 text-slate-500 font-medium"
          >
            Locked
          </Badge>
        ) : isCompleted ? (
          <div
            className={cn(
              "flex items-center justify-center h-6 w-6 rounded-full shrink-0",
              isActive ? "bg-white/15" : "bg-emerald-50"
            )}
          >
            <CheckCircle2
              className={cn(
                "h-3.5 w-3.5",
                isActive ? "text-white" : "text-emerald-500"
              )}
            />
          </div>
        ) : null}
      </div>
    </motion.button>
  );
};

export default TopicItem;