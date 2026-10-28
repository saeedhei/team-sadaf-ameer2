import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, COVERAGE_POSTCODES } from '../data/gardeningData';

export const AreaCoverage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = COVERAGE_POSTCODES.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="coverage" className="py-20 lg:py-28 bg-white border-y border-slate-200/80 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Local Service Area
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 [text-wrap:balance]">
            Serving Openshaw & Greater Manchester
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Centrally based on Ashton Old Road in Openshaw, we offer fast, reliable response times for domestic and
            commercial gardens throughout East Manchester, Tameside, and neighboring boroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Location Card & Street Map Visual */}
          <div className="lg:col-span-5 bg-[#fafcf8] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Our Base of Operations</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Openshaw, Manchester
              </h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {BUSINESS_INFO.address}
              </p>

              {/* Stylized local map representation */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-4 mb-6 shadow-inner">
                <div className="h-44 rounded-lg bg-emerald-950/5 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden border border-emerald-900/10">
                  {/* Subtle map road grid simulation */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg mb-2">
                      <MapPin className="w-6 h-6 text-emerald-300 animate-bounce" />
                    </div>
                    <span className="font-bold text-sm text-slate-900">1341 Ashton Old Rd</span>
                    <span className="text-xs text-slate-600">Openshaw, Manchester M11 1JT</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <span>Fast response across M11, M43, M18 & M4</span>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-900"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Get Directions to Ashton Old Road</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Postcode Search & Area Coverage List */}
          <div className="lg:col-span-7 bg-[#fafcf8] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Covered Postcodes & Districts</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Regular rounds throughout the week</p>
                </div>

                {/* Search Filter Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search postcode or town..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* District Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-900">{item.area}</span>
                      </div>
                      <span className="font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        {item.code}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-slate-500 text-xs sm:text-sm">
                    No exact match for "{searchQuery}". We may still cover your street—contact us directly!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span>Don't see your Manchester postcode? We regularly quote adjacent areas.</span>
              <a
                href={BUSINESS_INFO.getWhatsAppUrl("Hello, I would like to check if you cover my postcode in Manchester.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-900 font-bold hover:underline whitespace-nowrap"
              >
                Ask on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
