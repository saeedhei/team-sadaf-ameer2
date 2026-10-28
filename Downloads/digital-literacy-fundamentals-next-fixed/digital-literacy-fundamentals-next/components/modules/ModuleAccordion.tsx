// components/modules/ModuleAccordion.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  HelpCircle,
  Award,
  ListChecks,
} from "lucide-react";
import { Module, SectionItem, ContentType } from "@/types/course";

interface ModuleAccordionProps {
  modules: Module[];
  activeItemId: string;
  completedItemIds: string[];
  onSelectItem: (itemId: string, itemType: ContentType) => void;
  className?: string;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  modules,
  activeItemId,
  completedItemIds,
  onSelectItem,
  className,
}) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {modules.map((module) => {
          const isModuleLocked = module.status === "locked";

          // Calculate module progress
          const allModuleItems = module.sections.flatMap((sec) => sec.items);
          const totalItems = allModuleItems.length;
          const completedItemsCount = allModuleItems.filter((item) =>
            completedItemIds.includes(item.id)
          ).length;
          const moduleProgress =
            totalItems > 0 ? (completedItemsCount / totalItems) * 100 : 0;
          const isModuleCompleted =
            totalItems > 0 && completedItemsCount === totalItems;
          const isCurrentModule = allModuleItems.some(
            (item) => item.id === activeItemId
          );

          return (
            <AccordionItem
              key={module.id}
              value={module.id}
              disabled={isModuleLocked}
              className={cn(
                "overflow-hidden rounded-2xl border px-4 transition-all duration-300 sm:px-5",
                isModuleLocked
                  ? "border-slate-200 bg-slate-50/70 opacity-70"
                  : isCurrentModule
                  ? "border-blue-200 bg-white shadow-md shadow-blue-100/60 ring-1 ring-blue-100"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
              )}
            >
              <AccordionTrigger className="group py-5 text-left transition-colors duration-200 hover:no-underline">
                <div className="flex w-full flex-col justify-between gap-4 pr-2 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 items-start gap-3.5">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isModuleLocked ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 ring-1 ring-inset ring-slate-200">
                          <Lock className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                      ) : isModuleCompleted ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-emerald-600 ring-1 ring-inset ring-emerald-200">
                          <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
                            isCurrentModule
                              ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm shadow-blue-900/15 ring-transparent"
                              : "bg-blue-50 text-blue-600 ring-blue-100"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full border-2",
                              isCurrentModule ? "border-white" : "border-blue-600"
                            )}
                          >
                            <div
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                isCurrentModule ? "bg-white" : "bg-blue-600"
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title and Metadata */}
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
                          {module.title}
                        </h3>
                        {isCurrentModule && !isModuleCompleted && (
                          <Badge className="h-5 gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-0 text-[9px] font-medium text-white hover:from-blue-600 hover:to-indigo-600">
                            In Bearbeitung
                          </Badge>
                        )}
                        {module.badge && (
                          <Badge
                            variant="outline"
                            className="h-5 gap-1 border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100/60 px-2 py-0 text-[10px] text-amber-800"
                          >
                            <Award className="h-3 w-3 text-amber-500" />
                            <span>{module.badge.title}</span>
                          </Badge>
                        )}
                      </div>
                      <p className="line-clamp-1 text-[13px] leading-relaxed text-slate-500">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <ListChecks className="h-3 w-3" />
                        <span>{totalItems} Lektionen</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
                    <div className="w-28 space-y-1.5 text-right">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Fortschritt</span>
                        <span className="font-semibold tabular-nums text-slate-900">
                          {Math.round(moduleProgress)}%
                        </span>
                      </div>
                      <Progress
                        value={moduleProgress}
                        className={cn(
                          "h-1.5",
                          isModuleCompleted
                            ? "[&>div]:bg-emerald-500"
                            : "[&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-indigo-600"
                        )}
                      />
                    </div>
                    {isModuleLocked && (
                      <Badge
                        variant="secondary"
                        className="h-5 gap-1 bg-slate-100 px-2 py-0 text-[10px] font-medium text-slate-500"
                      >
                        <Lock className="h-2.5 w-2.5" />
                        Gesperrt
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-5 pb-5 pt-2">
                {module.sections.map((section) => (
                  <div key={section.id} className="space-y-2.5">
                    {/* Section Header */}
                    <div className="px-1">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {section.title}
                      </h4>
                      {section.description && (
                        <p className="mt-0.5 text-[11.5px] text-slate-400">
                          {section.description}
                        </p>
                      )}
                    </div>

                    {/* Section Items */}
                    <div className="space-y-1.5">
                      {section.items.map((item: SectionItem) => {
                        const isActive = item.id === activeItemId;
                        const isCompleted = completedItemIds.includes(item.id);

                        return (
                          <motion.button
                            key={item.id}
                            whileTap={isModuleLocked ? undefined : { scale: 0.99 }}
                            onClick={() => onSelectItem(item.id, item.type)}
                            disabled={isModuleLocked}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-[13px] transition-all duration-200",
                              isActive
                                ? "border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-sm shadow-blue-600/25"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                              isModuleLocked && "cursor-not-allowed opacity-50"
                            )}
                          >
                            <div className="flex min-w-0 items-center gap-3 pr-2">
                              <div
                                className={cn(
                                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                                  isActive ? "bg-white/15" : "bg-slate-100"
                                )}
                              >
                                {isModuleLocked ? (
                                  <Lock
                                    className="h-3.5 w-3.5 text-slate-400"
                                    strokeWidth={2}
                                  />
                                ) : item.type === "video" ? (
                                  <PlayCircle
                                    className={cn(
                                      "h-3.5 w-3.5",
                                      isActive ? "text-white" : "text-slate-400"
                                    )}
                                  />
                                ) : (
                                  <HelpCircle
                                    className={cn(
                                      "h-3.5 w-3.5",
                                      isActive ? "text-white" : "text-slate-400"
                                    )}
                                  />
                                )}
                              </div>
                              <span className="truncate">{item.title}</span>
                            </div>

                            {/* Item Status */}
                            <div className="flex shrink-0 items-center gap-2.5">
                              {item.video?.formattedDuration && (
                                <span
                                  className={cn(
                                    "text-[10.5px] tabular-nums",
                                    isActive ? "text-white/80" : "text-slate-400"
                                  )}
                                >
                                  {item.video.formattedDuration}
                                </span>
                              )}
                              {isCompleted && (
                                <CheckCircle2
                                  className={cn(
                                    "h-4 w-4 shrink-0",
                                    isActive ? "text-white" : "text-emerald-500"
                                  )}
                                  strokeWidth={2}
                                />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ModuleAccordion;