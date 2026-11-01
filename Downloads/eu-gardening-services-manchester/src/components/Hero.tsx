import React from 'react';
import {
  ArrowDown,
  MessageSquare,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

import { BUSINESS_INFO } from '../data/gardeningData';
import heroGardenImage from '../assets/images/hero_manchester_garden_1791992991902.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-24 pb-16 text-white lg:pt-32 lg:pb-24">

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroGardenImage}
          alt="Beautiful residential garden in Manchester with a striped lawn"
          className="h-full w-full object-cover object-center brightness-90"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/75 to-slate-900/60" />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">

          {/* Location */}
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-emerald-300 sm:text-sm">
            <MapPin
              className="h-4 w-4 shrink-0 text-emerald-400"
              aria-hidden="true"
            />
            <span>
              Openshaw &amp; Greater Manchester Local Gardening Business
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Beautiful Gardens,
            <br className="hidden sm:inline" />
            All Year Round
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-base font-normal leading-relaxed text-emerald-100/90 sm:text-lg">
            Reliable, high-standard gardening and grounds maintenance in
            Openshaw, Manchester, and surrounding areas. From precision
            striped lawn mowing and sharp hedge trimming to full garden
            clearances and pressure washing—we treat your garden with pride
            and care.
          </p>

          {/* Action Buttons */}
          <div className="mb-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">

            {/* WhatsApp Button */}
            <a
              href={BUSINESS_INFO.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 active:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-white sm:text-base"
            >
              <MessageSquare className="h-5 w-5 text-emerald-100" />
              <span>Get Free Quote on WhatsApp</span>
            </a>

            {/* Services Button */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:text-base"
            >
              <span>Our Services</span>
              <ArrowDown className="h-4 w-4 text-emerald-300" />
            </a>

            {/* Phone Button */}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-200 transition-colors hover:text-white lg:inline-flex"
            >
              <Phone className="h-4 w-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Business Highlights */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 text-xs text-emerald-100/80 sm:grid-cols-4 sm:text-sm">

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Free upfront quotes</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Based at 1341 Ashton Old Rd</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Commercial equipment</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>All cuttings bagged &amp; tidy</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};