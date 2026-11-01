import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowUp, Heart } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/gardeningData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-emerald-950 text-white pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-emerald-900/60">
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold text-base shadow-xs">
                <svg
                  className="w-5 h-5 text-emerald-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9Z" />
                  <path d="M12 2v20" />
                  <path d="M12 11c3-1.5 4-4.5 4-7" />
                  <path d="M12 16c-3-1.5-4-4.5-4-7" />
                </svg>
              </span>
              <span className="font-bold text-xl tracking-tight text-white">
                {BUSINESS_INFO.name}
              </span>
            </div>

            <p className="text-sm text-emerald-100/80 leading-relaxed font-normal max-w-sm">
              Professional, dependable gardening and garden maintenance across Openshaw, Manchester, and Greater
              Manchester. Beautiful gardens, all year round.
            </p>

            <div className="space-y-2 pt-2 text-xs sm:text-sm text-emerald-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{BUSINESS_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Gardening Services Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Contact & Quotes
            </h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Fastest response via WhatsApp. Send photos of your garden for an instant quote.
            </p>

            <a
              href={BUSINESS_INFO.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-100" />
              <span>WhatsApp: +44 7496 786474</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex w-full items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-medium text-xs rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Direct</span>
            </a>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. 1341 Ashton Old Rd, Openshaw, Manchester M11 1JT.</p>

          <div className="flex items-center gap-4">
            <span>Openshaw & Greater Manchester Local Trade</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
