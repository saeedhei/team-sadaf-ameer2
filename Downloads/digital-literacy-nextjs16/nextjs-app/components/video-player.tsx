'use client';

import { useState } from 'react';
import { Play, Video, Volume2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onWatchedComplete?: () => void;
  id?: string;
}

export default function VideoPlayer({
  videoUrl,
  title,
  onWatchedComplete,
  id,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Automatically convert normal YouTube links to embed links
  const embedUrl = videoUrl.includes("watch?v=")
    ? videoUrl.replace("watch?v=", "embed/")
    : videoUrl;

  const handlePlay = () => {
    setIsPlaying(true);

    if (onWatchedComplete && !hasCompleted) {
      setHasCompleted(true);

      setTimeout(() => {
        onWatchedComplete();
      }, 3000);
    }
  };

  return (
    <div
      id={id}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl group"
    >
      {!isPlaying ? (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 bg-linear-to-t from-slate-950/90 via-slate-900/40 to-slate-950/60">
          {/* Top Info */}
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit border border-white/10">
            <Video className="w-4 h-4 text-natural-brand animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-white font-sans">
              LESSON VIDEO
            </span>
          </div>

          {/* Play Button */}
          <div
            className="flex flex-col items-center justify-center self-center my-auto cursor-pointer"
            onClick={handlePlay}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1A1A1A] hover:bg-black text-white shadow-2xl transition-shadow duration-300"
            >
              <Play className="w-9 h-9 md:w-11 md:h-11 fill-current ml-1" />
            </motion.div>

            <span className="text-sm font-medium text-slate-200 mt-4 tracking-wide font-sans group-hover:text-white transition-colors">
              Click to Play Interactive Lesson
            </span>
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-end">
            <div className="max-w-xl pr-4">
              <h4 className="text-lg md:text-xl font-bold font-sans text-white tracking-tight line-clamp-1">
                {title}
              </h4>

              <p className="text-xs text-slate-300 mt-1 font-sans hidden sm:block">
                This guided training module covers key digital investigations,
                visual analysis, and platform algorithms.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              <Volume2 className="w-3.5 h-3.5" />
              <span>STEREO</span>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`${embedUrl}?autoplay=1&mute=1&rel=0`}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      {hasCompleted && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-emerald-500">
          <ShieldCheck className="w-4 h-4" />
          <span>Vetted & Unlocked</span>
        </div>
      )}
    </div>
  );
}