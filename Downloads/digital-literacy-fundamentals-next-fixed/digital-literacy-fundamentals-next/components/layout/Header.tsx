// components/layout/Header.tsx

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseProgressBar } from "@/components/shared/CourseProgressBar";
import { Award, GraduationCap, ChevronRight, Bell, User } from "lucide-react";
import { Badge as BadgeType, ProgressPercentage } from "@/types/course";

interface HeaderProps {
  courseTitle: string;
  currentModuleName?: string;
  overallProgress: ProgressPercentage;
  latestEarnedBadge?: BadgeType;
}

export const Header: React.FC<HeaderProps> = ({
  courseTitle,
  currentModuleName,
  overallProgress,
  latestEarnedBadge,
}) => {
  const roundedProgress = Math.round(overallProgress);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        {/* Left Side: Platform Mark, Course Title & Current Module */}
        <div className="flex min-w-0 items-center gap-3.5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-900/15"
          >
            <GraduationCap className="h-5 w-5" strokeWidth={2.1} />
          </motion.div>

          <div className="flex min-w-0 flex-col justify-center">
            <h1 className="truncate text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base">
              {courseTitle}
            </h1>
            {currentModuleName && (
              <div className="mt-1 hidden items-center gap-1 text-xs text-slate-500 sm:flex">
                <span className="font-medium text-slate-400">Modul</span>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span className="truncate text-slate-600">{currentModuleName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Badge, Progress, Notifications, Profile */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Badge Display */}
          {latestEarnedBadge && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex"
            >
              <Badge
                variant="secondary"
                className="gap-1.5 rounded-full border border-amber-200/80 bg-gradient-to-b from-amber-50 to-amber-100/60 px-3 py-1.5 text-amber-800 shadow-sm transition-colors hover:from-amber-100 hover:to-amber-100"
              >
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-medium">{latestEarnedBadge.title}</span>
              </Badge>
            </motion.div>
          )}

          {/* Progress Tracker */}
          <div className="hidden min-w-[160px] flex-col items-end gap-1.5 rounded-lg px-1 sm:flex lg:min-w-[200px]">
            <div className="flex w-full items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Gesamtfortschritt
              </span>
              <span className="text-[11px] font-semibold tabular-nums text-blue-700">
                {roundedProgress}%
              </span>
            </div>
            <CourseProgressBar progress={roundedProgress} label="Progress" />
          </div>

          <Separator orientation="vertical" className="hidden h-7 lg:block" />

          {/* Notification Button */}
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Benachrichtigungen"
                >
                  <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6}>
                Benachrichtigungen
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Profile / Avatar */}
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200/70 text-slate-600 ring-1 ring-inset ring-slate-200 transition-colors hover:from-slate-200 hover:to-slate-200"
                  aria-label="Benutzerprofil"
                >
                  <User className="h-4 w-4" strokeWidth={2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6}>
                Profil
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile progress + module row */}
      <div className="flex flex-col gap-2 px-4 pb-3 sm:hidden">
        {currentModuleName && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Modul</span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="truncate text-slate-600">{currentModuleName}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex w-full items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Fortschritt
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-blue-700">
              {roundedProgress}%
            </span>
          </div>
          <div className="min-w-[100px] flex-1">
            <CourseProgressBar progress={roundedProgress} label="Progress" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;