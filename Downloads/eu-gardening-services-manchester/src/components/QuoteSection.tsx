import React, { useState } from 'react';
import { MessageSquare, Phone, CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, COVERAGE_POSTCODES } from '../data/gardeningData';

export const QuoteSection: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Lawn Mowing & Care']);
  const [gardenSize, setGardenSize] = useState<string>('Medium (Semi-Detached)');
  const [frequency, setFrequency] = useState<string>('Fortnightly Regular');
  const [postcode, setPostcode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [postcodeFeedback, setPostcodeFeedback] = useState<{ covered: boolean; area?: string } | null>(null);

  const gardenSizeOptions = [
    { label: 'Small', desc: 'Front lawn / terraced courtyard' },
    { label: 'Medium (Semi-Detached)', desc: 'Typical suburban front & back garden' },
    { label: 'Large (Detached)', desc: 'Substantial lawns, perimeter hedges' },
    { label: 'Commercial / Grounds', desc: 'Flats, offices, communal areas' },
  ];

  const frequencyOptions = [
    'One-off Blitz / Tidy',
    'Fortnightly Regular',
    'Monthly Upkeep',
    'Seasonal (Spring/Autumn)',
  ];

  const toggleService = (serviceTitle: string) => {
    if (selectedServices.includes(serviceTitle)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== serviceTitle));
      }
    } else {
      setSelectedServices([...selectedServices, serviceTitle]);
    }
  };

  const handlePostcodeChange = (value: string) => {
    setPostcode(value);
    const trimmed = value.trim().toUpperCase();
    if (trimmed.length >= 2) {
      const match = COVERAGE_POSTCODES.find((c) =>
        trimmed.startsWith(c.code) || trimmed.replace(/\s+/g, '').startsWith(c.code)
      );
      if (match) {
        setPostcodeFeedback({ covered: true, area: match.area });
      } else if (trimmed.startsWith('M') || trimmed.startsWith('SK') || trimmed.startsWith('OL')) {
        setPostcodeFeedback({ covered: true, area: 'Greater Manchester Area' });
      } else if (trimmed.length >= 3) {
        setPostcodeFeedback({ covered: false });
      } else {
        setPostcodeFeedback(null);
      }
    } else {
      setPostcodeFeedback(null);
    }
  };

  const generateWhatsAppMessage = () => {
    const servicesList = selectedServices.join(', ');
    return `Hello EU Gardening Services, I would like a free quote for my property in Manchester.
• Services: ${servicesList}
• Garden Size: ${gardenSize}
• Frequency: ${frequency}
• Postcode: ${postcode || 'Openshaw/Manchester'}
${name ? `• Name: ${name}` : ''}
${notes ? `• Details: ${notes}` : ''}
Please let me know your availability!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 lg:py-28 bg-[#fafcf8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            No Obligation · Free Assessment
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 [text-wrap:balance]">
            Get Your Free Gardening Quote
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Tell us about your garden and the services you need. We provide transparent, upfront quotes with zero pressure.
            You can send your details directly via WhatsApp or submit the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Interactive Quote Builder Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Thank You, {name || 'Homeowner'}!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  We have received your gardening quote request for <strong>{postcode || 'Manchester'}</strong>.
                  For an even faster reply, tap below to forward your details directly to our WhatsApp.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={BUSINESS_INFO.getWhatsAppUrl(generateWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto py-3 px-5 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                  >
                    Edit Quote Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* 1. Services Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">
                    1. Select Service(s) Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((s) => {
                      const isSelected = selectedServices.includes(s.title);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.title)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-semibold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{s.title}</span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              isSelected
                                ? 'bg-emerald-700 text-white'
                                : 'border border-slate-300'
                            }`}
                          >
                            {isSelected && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Garden Size */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    2. Approximate Garden Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {gardenSizeOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setGardenSize(opt.label)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          gardenSize === opt.label
                            ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{opt.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frequency */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    3. Visit Frequency
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {frequencyOptions.map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          frequency === freq
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Contact & Postcode Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quote-postcode" className="block text-xs font-semibold text-slate-700 mb-1">
                      Manchester Postcode (e.g. M11 1JT) *
                    </label>
                    <input
                      id="quote-postcode"
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => handlePostcodeChange(e.target.value)}
                      placeholder="e.g. M11 1JT or M43"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                    />
                    {postcodeFeedback && (
                      <p className={`text-xs mt-1.5 flex items-center gap-1 ${
                        postcodeFeedback.covered ? 'text-emerald-700 font-medium' : 'text-amber-700'
                      }`}>
                        {postcodeFeedback.covered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Covered area: {postcodeFeedback.area}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Check with us directly—we may still be able to quote!</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07496 786474"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="quote-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="quote-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                      Notes or Garden Access (Optional)
                    </label>
                    <textarea
                      id="quote-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Side gate access available, hedges are approx 7ft tall..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={BUSINESS_INFO.getWhatsAppUrl(generateWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-all shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    <span>Send Quote to WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Callback</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Fast Contact & Why WhatsApp Works Best */}
          <div className="lg:col-span-4 space-y-6">
            {/* Instant WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-emerald-900 text-white shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fastest Way: WhatsApp Photos</h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6 font-normal">
                Take 2 or 3 quick photos or a short video of your lawn, hedge, or patio and message us.
                We can often give you an accurate price within minutes.
              </p>

              <a
                href={BUSINESS_INFO.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Message +44 7496 786474</span>
              </a>
            </div>

            {/* Direct Phone Call Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Prefer to speak to someone?</h4>
              <p className="text-xs text-slate-600 mb-4 leading-normal">
                Call our Manchester base directly during working hours (08:00 – 18:00).
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 text-emerald-900 font-bold text-base hover:text-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Honest Commitment */}
            <div className="p-5 rounded-2xl bg-[#f7faf5] border border-emerald-900/10">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Our Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Free quotes are 100% no-obligation. If you decide not to proceed, no worries at all.
                All agreed quotes are fixed upfront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
