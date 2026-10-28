// components/layout/Sidebar.tsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { Module, SectionItem, ContentType } from "@/types/course";

interface SidebarProps {
  modules: Module[];
  activeItemId: string;
  activeModuleId: string;
  completedItemIds: string[];
  onSelectItem: (itemId: string, itemType: ContentType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  activeItemId,
  activeModuleId,
  completedItemIds,
  onSelectItem,
}) => {
  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto border-r border-slate-200 bg-white lg:w-80">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm shadow-blue-900/15">
            <BookOpen className="h-4 w-4 text-white" strokeWidth={2.1} />
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-none tracking-tight text-slate-900">
              Kursübersicht
            </h2>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Verfolgen Sie Ihren Fortschritt
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-4">
        <Accordion
          type="single"
          collapsible
          defaultValue={activeModuleId}
          className="w-full space-y-2.5"
        >
          {modules.map((module) => {
            const isModuleLocked = module.status === "locked";

            // Calculate module progress
            const allModuleItems = module.sections.flatMap((sec) => sec.items);
            const totalItems = allModuleItems.length;
            const completedItemsCount = allModuleItems.filter((item) =>
              completedItemIds.includes(item.id)
            ).length;
            const isModuleCompleted =
              totalItems > 0 && completedItemsCount === totalItems;
            const progressPct =
              totalItems > 0 ? (completedItemsCount / totalItems) * 100 : 0;

            return (
              <AccordionItem
                key={module.id}
                value={module.id}
                disabled={isModuleLocked}
                className={cn(
                  "overflow-hidden rounded-xl border px-3 transition-all duration-200",
                  isModuleLocked
                    ? "border-slate-200 bg-slate-50/70 opacity-60"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                )}
              >
                <AccordionTrigger className="group py-3.5 text-left hover:no-underline">
                  <div className="flex w-full items-start gap-3 pr-2">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isModuleLocked ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200">
                          <Lock className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                        </div>
                      ) : isModuleCompleted ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/70 ring-1 ring-inset ring-emerald-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 ring-1 ring-inset ring-blue-100">
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Module Title & Progress */}
                    <div className="min-w-0 flex-1 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-tight text-slate-900">
                          {module.title}
                        </p>
                        {isModuleLocked && (
                          <Badge
                            variant="outline"
                            className="h-4 shrink-0 gap-1 border-slate-300 px-1.5 py-0 text-[9px] font-medium text-slate-500"
                          >
                            <Lock className="h-2 w-2" />
                            Gesperrt
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={cn(
                              "h-full rounded-full",
                              isModuleCompleted
                                ? "bg-emerald-500"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600"
                            )}
                          />
                        </div>
                        <span className="text-[10px] font-medium tabular-nums text-slate-500">
                          {completedItemsCount}/{totalItems} abgeschlossen
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="space-y-4 pb-3.5 pt-1">
                  {module.sections.map((section) => (
                    <div key={section.id} className="space-y-1.5">
                      {/* Section Title */}
                      <p className="px-2.5 text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
                        {section.title}
                      </p>

                      {/* Section Items */}
                      <div className="relative space-y-1">
                        {section.items.map((item: SectionItem) => {
                          const isActive = item.id === activeItemId;
                          const isCompleted = completedItemIds.includes(item.id);

                          return (
                            <button
                              key={item.id}
                              onClick={() => onSelectItem(item.id, item.type)}
                              disabled={isModuleLocked}
                              className={cn(
                                "relative flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[12.5px] transition-all duration-200",
                                isActive
                                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-sm shadow-blue-600/25"
                                  : isCompleted
                                  ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                isModuleLocked && "cursor-not-allowed opacity-50"
                              )}
                            >
                              {/* Active indicator bar */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.span
                                    layoutId="sidebar-active-indicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-600"
                                  />
                                )}
                              </AnimatePresence>

                              <div className="flex min-w-0 items-center gap-2.5 pr-2">
                                {isModuleLocked ? (
                                  <Lock
                                    className="h-3.5 w-3.5 shrink-0 text-slate-400"
                                    strokeWidth={2}
                                  />
                                ) : item.type === "video" ? (
                                  <PlayCircle
                                    className={cn(
                                      "h-3.5 w-3.5 shrink-0",
                                      isActive ? "text-white" : "text-slate-400"
                                    )}
                                  />
                                ) : (
                                  <HelpCircle
                                    className={cn(
                                      "h-3.5 w-3.5 shrink-0",
                                      isActive ? "text-white" : "text-slate-400"
                                    )}
                                  />
                                )}
                                <span className="truncate">{item.title}</span>
                              </div>

                              {/* Item Completion Indicator */}
                              {isCompleted && (
                                <CheckCircle2
                                  className={cn(
                                    "h-3.5 w-3.5 shrink-0",
                                    isActive ? "text-white" : "text-emerald-500"
                                  )}
                                  strokeWidth={2}
                                />
                              )}
                            </button>
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
    </aside>
  );
};

export default Sidebar;