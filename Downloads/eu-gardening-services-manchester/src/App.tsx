import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { AboutSection } from './components/AboutSection';
import { ProjectGallery } from './components/ProjectGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteSection } from './components/QuoteSection';
import { AreaCoverage } from './components/AreaCoverage';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfa] text-slate-800 selection:bg-emerald-700 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full-width Hero Section */}
        <Hero />

        {/* Six-Service Grid */}
        <ServicesGrid />

        {/* About Section with 4 Trust Indicators */}
        <AboutSection />

        {/* Garden-Project Gallery */}
        <ProjectGallery />

        {/* Customer Testimonials with explicit sample content notice */}
        <TestimonialsSection />

        {/* Prominent Free Quote Section & Postcode Checker */}
        <QuoteSection />

        {/* Local Area Coverage & Physical Address Details */}
        <AreaCoverage />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Mobile/Desktop Quick Contact Pill */}
      <FloatingContact />
    </div>
  );
}
