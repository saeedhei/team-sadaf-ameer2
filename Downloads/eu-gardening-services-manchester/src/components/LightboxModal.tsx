import React, { useEffect } from 'react';
import { X, MapPin, Clock, MessageSquare } from 'lucide-react';
import { GalleryProject } from '../types';
import { BUSINESS_INFO } from '../data/gardeningData';

interface LightboxModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const inquiryMessage = `Hello EU Gardening Services, I saw your "${project.title}" project in ${project.location} on your website and would like a quote for similar work.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full Image */}
        <div className="relative h-64 sm:h-96 w-full bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content details */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="lightbox-project-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium text-emerald-800">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Completed in {project.completionTime}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {project.description}
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              All work carried out by EU Gardening Services team using commercial equipment.
            </p>
            <a
              href={BUSINESS_INFO.getWhatsAppUrl(inquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Quote for Similar Work</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
