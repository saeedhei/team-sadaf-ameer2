import React from 'react';
import { Star, Info, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/gardeningData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Local Reputation
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 [text-wrap:balance]">
            What Manchester Homeowners Can Expect
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We hold ourselves to high standards of punctuality, courtesy, and craftsmanship on every garden we visit.
          </p>
        </div>

        {/* Transparent Sample Content Notice as requested */}
        <div className="max-w-3xl mx-auto mb-12 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Notice on Customer Reviews: </span>
            The testimonials below are illustrative sample reviews reflecting typical residential gardening projects in
            Greater Manchester (Openshaw, Droylsden, Clayton, Gorton). Verified customer feedback will be updated on this
            page as new Google and direct client reviews are submitted.
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#fafcf8] border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating & Service */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Clean unboxed metadata */}
                  <span className="text-xs text-slate-500 font-medium">
                    {testimonial.service}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{testimonial.name}</span>
                  <span className="text-slate-500"> — {testimonial.area} ({testimonial.postcode})</span>
                </div>
                <span>{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review / WhatsApp feedback prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            Have we recently worked on your garden? We appreciate your feedback.
          </p>
          <a
            href={BUSINESS_INFO.getWhatsAppUrl("Hello EU Gardening Services, I'd like to leave feedback for recent work on my garden.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 underline underline-offset-4"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Send feedback via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
