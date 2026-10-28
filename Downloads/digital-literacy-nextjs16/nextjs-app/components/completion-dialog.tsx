'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  nextModuleTitle: string | null;
  onNextModule?: () => void;
  id?: string;
}

export default function CompletionDialog({
  isOpen,
  onClose,
  moduleTitle,
  nextModuleTitle,
  onNextModule,
  id,
}: CompletionDialogProps) {
  // Generate the certificate ID once (lazy initializer runs a single time, not on every render)
  const [certificateId] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent id={id} className="max-w-lg">
        {/* Glowing Accent Top Bar */}
        <div className="h-2 bg-natural-brand" />

        {/* Content Container */}
        <div className="p-8 flex flex-col items-center text-center">
          {/* Award / Medal Icon Animation */}
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, damping: 15 }}
              className="flex items-center justify-center w-24 h-24 rounded-full bg-[#F2F4F2] dark:bg-emerald-950/50 border-4 border-[#4A5D4E] text-[#4A5D4E]"
            >
              <Award className="w-12 h-12" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-emerald-400/30 -z-10"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [-10, -40, -60], x: [-10, 20, 10] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute text-amber-500 top-4 right-0"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title & Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#F2F4F2] dark:bg-emerald-950/40 text-[#4A5D4E] dark:text-[#4A5D4E] px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-[#E5E5DF]">
            <CheckCircle className="w-4 h-4 text-[#4A5D4E]" />
            <span>MODULE COMPLETED</span>
          </div>

          <h3 className="text-2xl font-bold font-serif text-[#1A1A1A] dark:text-white tracking-tight leading-snug">
            Congratulations!
          </h3>
          <p className="text-[#7A7A70] dark:text-slate-300 text-sm mt-3 max-w-sm leading-relaxed">
            You have successfully vetted, analyzed, and passed all sections and quizzes of:
            <span className="block font-semibold text-[#1A1A1A] dark:text-white mt-1">&quot;{moduleTitle}&quot;</span>
          </p>

          {/* Share/Verify Stamp */}
          <div className="w-full mt-6 p-4 rounded-xl bg-[#F9F9F7] dark:bg-slate-800/50 border border-[#E5E5DF] flex items-center justify-between text-left">
            <div>
              <h5 className="text-xs font-bold text-[#9A9A92] uppercase tracking-wider font-mono">Certification Stamp</h5>
              <p className="text-sm font-semibold text-[#2D2D2D] dark:text-slate-200 mt-0.5">Media Literacy Vetted Badge</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#9A9A92] font-mono hidden sm:inline">ID: LRN-{certificateId}</span>
              <button className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-[#E5E5DF] dark:border-slate-700 text-[#7A7A70] dark:text-slate-300 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Action Buttons */}
          <div className="w-full mt-8 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Review Module
            </Button>

            {nextModuleTitle && onNextModule ? (
              <Button
                onClick={() => {
                  onNextModule();
                  onClose();
                }}
                className="flex-1"
              >
                <span>Next Module</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onClose} className="flex-1">
                <span>Complete Course</span>
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
