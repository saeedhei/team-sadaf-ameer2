import React, { useState } from 'react';
import { ArrowRight, Check, MessageSquare } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/gardeningData';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

export const ServicesGrid: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#fafcf8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Local Manchester Gardening Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 [text-wrap:balance]">
            Expert Garden Care for Every Season
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you need weekly striped lawn cutting, regular hedge shaping, or a complete overgrown garden makeover,
            we deliver tidy, honest, and high-standard craftsmanship throughout Manchester.
          </p>
        </div>

        {/* Six-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Service Image with fallback */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-md text-xs font-semibold text-emerald-950 shadow-xs">
                  0{index + 1}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-5 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-emerald-800"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={BUSINESS_INFO.getWhatsAppUrl(
                      `Hello EU Gardening Services, I'd like a quote for ${service.title} in Manchester.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs transition-colors focus-visible:outline-2 focus-visible:outline-emerald-800"
                    title={`Get a WhatsApp quote for ${service.title}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Quote</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section bottom prompt */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-900 text-white shadow-sm max-w-2xl mx-auto">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base text-white">Need a combination of gardening services?</p>
              <p className="text-xs text-emerald-200">We offer package visits including mowing, hedge clipping & weed clearance.</p>
            </div>
            <a
              href="#quote"
              className="px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              Build Your Quote
            </a>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};
