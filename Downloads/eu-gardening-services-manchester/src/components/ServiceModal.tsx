import React, { useEffect } from 'react';
import { X, Check, MessageSquare, Phone, Calendar, Clock, AlertCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { BUSINESS_INFO } from '../data/gardeningData';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const bespokeWhatsAppMessage = `Hello EU Gardening Services, I'm interested in getting a free quote for ${service.title} at my property in Manchester.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 id="service-modal-title" className="text-2xl font-bold tracking-tight text-white mb-1">
              {service.title}
            </h2>
            <p className="text-emerald-200 text-sm font-medium">{service.pricingGuide}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-2">
              Service Overview
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {service.fullDesc}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
              What Is Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-950 mb-1">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Recommended Frequency</span>
              </div>
              <p className="text-slate-600">{service.recommendedFrequency}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
                <Clock className="w-4 h-4 text-slate-700" />
                <span>Best Suited For</span>
              </div>
              <p className="text-slate-600">{service.bestFor}</p>
            </div>
          </div>

          {/* Free Quote Callout */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Need an estimate?</strong> Send us a quick photo or video of your garden over WhatsApp for an instant, accurate estimate with no obligation.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <a
              href={BUSINESS_INFO.getWhatsAppUrl(bespokeWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Request Quote on WhatsApp</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-800" />
              <span>Call Us Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
