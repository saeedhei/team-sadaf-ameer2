import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/gardeningData';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-950/5 py-3'
            : 'bg-white/90 backdrop-blur-xs border-b border-emerald-950/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strictly adhering to the 3-Zone Top Bar Contract */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single text element wordmark, no pill badge clutter) */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-emerald-950 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-emerald-700"
              aria-label="EU Gardening Services - Return to Homepage"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-emerald-800 transition-colors">
                <svg
                  className="w-5 h-5 text-emerald-400"
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
              <span className="font-bold text-xl tracking-tight text-emerald-950">
                EU Gardening Services
              </span>
            </a>

            {/* Zone 2: 4-5 Clean single-line text navigation links */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700"
            >
              <a
                href="#services"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                Services
              </a>
              <a
                href="#about"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                About
              </a>
              <a
                href="#gallery"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                Gallery
              </a>
              <a
                href="#coverage"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                Service Areas
              </a>
              <a
                href="#quote"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                Free Quote
              </a>
              <a
                href="#contact"
                className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                Contact
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={BUSINESS_INFO.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:bg-emerald-950 transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-emerald-800"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>WhatsApp Quote</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-emerald-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-800"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        >
          <div
            className="fixed top-16 right-0 left-0 bg-white border-b border-slate-200 p-6 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3 text-base font-medium text-slate-800">
              <a
                href="#services"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                About EU Gardening
              </a>
              <a
                href="#gallery"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                Project Gallery
              </a>
              <a
                href="#coverage"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                Manchester Coverage
              </a>
              <a
                href="#quote"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                Free Instant Quote
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
              >
                Contact & Location
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 text-white rounded-lg font-semibold text-sm hover:bg-emerald-900 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp ({BUSINESS_INFO.phone})</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-slate-800 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
