// components/video/VideoPlayer.tsx

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  Loader2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { VideoLesson } from "@/types/course";

interface VideoPlayerProps {
  video: VideoLesson;
  isCompleted?: boolean;
  onComplete: (videoId: string) => void;
  /** Optional — enables the "Next Lesson" action once the user completes this video. */
  onNext?: () => void;
  /** Optional — controls whether the "Next Lesson" button is shown/enabled. */
  hasNext?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isCompleted = false,
  onComplete,
  onNext,
  hasNext = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Optional field — rendered only when present on the underlying data,
  // without altering the VideoLesson type contract.
  const thumbnailUrl = (video as { thumbnailUrl?: string }).thumbnailUrl;

  // Reset player state whenever the selected topic/video changes,
  // so the component works for any topic without code changes.
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
    setHasError(!video?.videoUrl);
  }, [video?.id, video?.videoUrl]);

  // Helper to extract embeddable YouTube URL
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const handlePlay = () => {
    if (!video?.videoUrl) {
      setHasError(true);
      return;
    }
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleRetry = () => {
    setHasError(!video?.videoUrl);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleMarkAsComplete = () => {
    onComplete(video.id);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm shadow-slate-900/5">
        <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {isCompleted && (
                  <Badge className="gap-1 border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-600 hover:bg-emerald-50">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
                {!isCompleted && (
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700"
                  >
                    Current Lesson
                  </Badge>
                )}
              </div>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                <PlayCircle className="h-4.5 w-4.5 shrink-0 text-blue-600" />
                <span className="truncate">{video.title}</span>
              </CardTitle>
              {video.description && (
                <p className="max-w-2xl text-[12.5px] leading-relaxed text-slate-500 sm:text-[13px]">
                  {video.description}
                </p>
              )}
            </div>

            {video.formattedDuration && (
              <Badge
                variant="outline"
                className="shrink-0 gap-1 border-slate-200 px-2 py-1 text-[11px] text-slate-500"
              >
                <Clock className="h-3 w-3" />
                <span>{video.formattedDuration}</span>
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-4 pt-0 sm:p-5 sm:pt-0">
          {/* Responsive Video Container — fixed 16:9, capped so it never grows too large */}
          <div className="relative mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner">
            <AnimatePresence mode="wait">
              {hasError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center text-white"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">This video is unavailable</p>
                    <p className="text-xs text-white/60">
                      We couldn&apos;t load the lesson video. Please try again.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleRetry}
                    className="mt-1 gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retry
                  </Button>
                </motion.div>
              ) : !isPlaying ? (
                <motion.button
                  key="thumbnail"
                  type="button"
                  onClick={handlePlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                  style={
                    thumbnailUrl
                      ? {
                          backgroundImage: `url(${thumbnailUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <div
                    className={
                      thumbnailUrl
                        ? "absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50"
                        : "absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
                    }
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl sm:h-16 sm:w-16"
                    >
                      <PlayCircle className="h-7 w-7 text-blue-600 sm:h-8 sm:w-8" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-xs font-medium tracking-wide text-white/90 sm:bottom-4 sm:left-4">
                    Click to play lesson
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 h-full w-full"
                >
                  {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
                      <div className="flex flex-col items-center gap-2 text-white/80">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="text-xs">Loading video...</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={getEmbedUrl(video.videoUrl)}
                    title={video.title}
                    className="absolute left-0 top-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Transcript (Optional) */}
          {video.transcript && (
            <div className="mx-auto max-w-2xl space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-500 sm:p-4">
              <span className="font-semibold text-slate-700">Transcript Snippet</span>
              <p className="italic leading-relaxed">{video.transcript}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-stretch justify-between gap-3 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:p-5">
          <p className="text-xs text-slate-500">
            {isCompleted
              ? "You have finished this video lesson."
              : "Watch the video lesson and mark it as finished to track your progress."}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              onClick={handleMarkAsComplete}
              disabled={isCompleted}
              variant={isCompleted ? "outline" : "default"}
              className={
                isCompleted
                  ? "gap-2 border-slate-200 text-slate-500"
                  : "gap-2 bg-blue-600 shadow-sm shadow-blue-600/25 hover:bg-blue-700"
              }
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
            </Button>

            {onNext && (
              <Button
                onClick={onNext}
                disabled={!isCompleted || !hasNext}
                variant="outline"
                className="gap-2 border-slate-200"
              >
                <span>Next Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideoPlayer;