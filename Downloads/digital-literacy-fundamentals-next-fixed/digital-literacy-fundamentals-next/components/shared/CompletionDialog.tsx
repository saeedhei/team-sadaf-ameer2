// components/shared/CompletionDialog.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

interface CompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  progressPercentage?: number;
  onContinue: () => void;
  className?: string;
}

export const CompletionDialog: React.FC<CompletionDialogProps> = ({
  open,
  onOpenChange,
  title = "Congratulations!",
  description = "You have successfully completed this section. Keep up the great work!",
  progressPercentage = 100,
  onContinue,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 sm:max-w-md ${className || ""}`}
      >
        <DialogHeader className="flex flex-col items-center space-y-3 pt-5 text-center">
          {/* Trophy Icon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/70 ring-1 ring-inset ring-emerald-200"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-600/30"
            >
              <Trophy className="h-7 w-7" strokeWidth={2} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="space-y-1.5"
          >
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </DialogTitle>

            <DialogDescription className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
              {description}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        {/* Progress display */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
          className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3.5"
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Course Progress
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {progressPercentage}%
            </span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
          />
        </motion.div>

        <DialogFooter className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl border-slate-200 sm:w-auto"
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={onContinue}
            className="w-full gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm shadow-emerald-600/25 transition-all duration-200 hover:from-emerald-700 hover:to-emerald-800 sm:w-auto"
          >
            <span>Continue Learning</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;