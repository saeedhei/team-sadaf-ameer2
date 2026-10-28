import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/gardeningData';

export const FloatingContact: React.FC = () => {
  return (
    <aside
      aria-label="Direct Quick Contact"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2"
    >
      <a
        href={BUSINESS_INFO.getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with EU Gardening Services"
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-950/30 transition-all duration-200 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-emerald-400 group"
      >
        <span className="w-5 h-5 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white fill-white/20" />
        </span>
        <span className="text-xs font-bold tracking-wide whitespace-nowrap pr-1 hidden sm:inline">
          WhatsApp Quote
        </span>
      </a>

      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        aria-label="Call EU Gardening Services directly"
        className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-slate-400 sm:hidden"
      >
        <Phone className="w-4 h-4 text-emerald-300" />
      </a>
    </aside>
  );
};
