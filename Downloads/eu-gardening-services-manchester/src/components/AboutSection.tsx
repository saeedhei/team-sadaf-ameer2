import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

import {
  BUSINESS_INFO,
  TRUST_INDICATORS,
} from '../data/gardeningData';

import gardenImage from '../assets/images/garden_makeover_patio_1791992995362.jpg';

export const AboutSection: React.FC = () => {
  const iconList = [MapPin, ShieldCheck, Clock, Sparkles];

  return (
    <section
      id="about"
      className="scroll-mt-12 border-y border-slate-200 bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800/10 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Get to Know Us
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your Local Garden Care
            <span className="block text-emerald-800">
              Experts in Manchester
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Thoughtful garden maintenance, reliable service, and beautiful
            outdoor spaces you can enjoy throughout the year.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: Garden Image */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">
             <img
  src={gardenImage}
  alt="Garden makeover completed by EU Gardening Services"
  className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[520px]"
  loading="lazy"
/>

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

              {/* Image Label */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-7 sm:left-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white">
                  <MapPin className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    Our Local Base
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {BUSINESS_INFO.name}
                  </p>
                  <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-600">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-3xl bg-emerald-100"
            />
          </div>

          {/* Right: About Content */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-emerald-700" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm">
                About EU Gardening Services
              </p>
            </div>

            <h3 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Helping Manchester Gardens Look Their Best
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                Based at <strong className="text-slate-900">1341 Ashton Old Rd in Openshaw</strong>,
                EU Gardening Services provides garden maintenance for
                residential and commercial properties across Manchester,
                Tameside, and surrounding areas.
              </p>

              <p>
                From neat lawn stripes and carefully trimmed hedges to
                refreshed patios and tidy pathways, we take pride in the
                details that make an outdoor space feel special.
              </p>

              <p>
                Our approach is simple: clear communication, reliable
                appointments, honest advice, and care for your garden in
                every season.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TRUST_INDICATORS.map((indicator, index) => {
                const IconComponent = iconList[index] || Award;

                return (
                  <div
                    key={indicator.title ?? index}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 hover:border-emerald-700/30 hover:bg-emerald-50/70"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 transition-colors group-hover:bg-emerald-800 group-hover:text-white">
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {indicator.title}
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                          {indicator.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Service Promise */}
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <p className="text-sm leading-6 text-emerald-950">
                <strong>Care in every detail.</strong> We aim to leave your
                garden and outdoor areas clean, tidy, and ready to enjoy.
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href={BUSINESS_INFO.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                <MessageSquare className="h-5 w-5" />
                Message on WhatsApp
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                <Phone className="h-5 w-5 text-emerald-800" />
                Call {BUSINESS_INFO.phone}
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Service Qualities */}
        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-slate-200 pt-10 sm:grid-cols-3">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Careful Work
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Attention to the finishing touches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Reliable Service
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Clear communication and appointments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Pride in Every Garden
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                A tidy finish for your outdoor space
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};