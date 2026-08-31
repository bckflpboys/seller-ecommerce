import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Building2, Sparkles, Home, Shirt, SprayCan, Droplets, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Phone, 
  Mail, MapPin, Check, Filter, Layers, Calculator, ArrowUpRight
} from 'lucide-react';
import { SERVICES_DATA, TARGET_MARKETS, COMPETITIVE_ADVANTAGES } from '@/data/servicesData';

import MetaSEO from '@/components/MetaSEO';

const iconMap: Record<string, any> = {
  Building2,
  Sparkles,
  Home,
  Shirt,
  SprayCan,
  Droplets
};

const SERVICES_FAQS = [
  {
    question: "What contract cleaning models does Moon Soft provide in Kimberley?",
    answer: "We offer daily early morning, day porter, after-hours, and weekend cleaning rotas for offices, educational campuses, clinics, and commercial facilities with dedicated on-site supervision and transparent SLAs."
  },
  {
    question: "Are emergency deep sanitisation services available across the Northern Cape?",
    answer: "Yes, our rapid-response deep sanitisation and clinical decontamination teams can deploy within hours across Kimberley and Northern Cape regional centers."
  },
  {
    question: "Do you supply all industrial equipment, vacuums, and cleaning chemicals?",
    answer: "Yes, all contracts include our industrial HEPA filtration vacuums, floor burnishers, steam extractors, and Moon Soft certified SABS-approved cleaning chemical supplies."
  }
];

export default function ServicesPage() {
  return (
    <>
      <MetaSEO
        title="Commercial Cleaning Services Directory Kimberley | Moon Soft"
        description="Explore Moon Soft's 6 specialized commercial cleaning divisions in Kimberley & Northern Cape: Contract Cleaning, Deep Sanitisation, Post-Construction, Carpet Extraction, Window Detailing, and SABS Chemical Supply."
        canonicalUrl="https://www.moonsoft.life/services"
        ogImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
        faqs={SERVICES_FAQS}
        keywords={[
          'Commercial Cleaning Services Kimberley',
          'Northern Cape Contract Cleaners',
          'Deep Cleaning Kimberley',
          'Post Construction Cleaners Kimberley',
          'Carpet Cleaners Kimberley',
          'Window Cleaners Kimberley',
          'Cleaning Chemicals Kimberley'
        ]}
      />

      <div className="min-h-screen bg-slate-50 text-navy-950 font-sans">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: Swiss Editorial Header with Background Photography */}
        {/* ========================================================================= */}
        <section className="relative bg-navy-950 text-white pt-16 pb-24 px-4 overflow-hidden border-b border-navy-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
              alt="Modern Office Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
          <div className="absolute inset-0 z-0 opacity-10 swiss-dark-grid pointer-events-none" />
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-navy-900 border border-slate-700/80 rounded-full px-4 py-1.5 mb-6 text-xs uppercase tracking-widest font-mono text-cyanAccent">
              <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
              <span>Kimberley &amp; Northern Cape Region</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05] mb-6">
                  Specialized Cleaning Services <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-blue-300 to-white">
                    Where Quality Meets Care.
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed">
                  Enterprise-grade hygiene solutions for corporate enterprises, healthcare facilities, educational institutions, commercial developments, and discerning residential estates.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-center shadow-glow-blue transition-all text-xs uppercase tracking-wider"
                >
                  Request Site Assessment
                </Link>
                <a
                  href="#services-grid"
                  className="bg-white/10 hover:bg-white/15 text-slate-200 font-semibold py-3.5 px-6 rounded-xl text-center border border-white/20 transition-all text-xs uppercase tracking-wider"
                >
                  Explore All 6 Divisions
                </a>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-navy-800">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white">06</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Specialized Divisions</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-cyanAccent">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Vetted Staff</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white">SABS</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Approved Chemicals</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Contract Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHOTO BENTO SERVICES DIRECTORY */}
        {/* ========================================================================= */}
        <section id="services-grid" className="py-20 md:py-28 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-xs font-mono tracking-widest text-blue-600 uppercase font-bold bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
                  01 // ALL 6 DIVISIONS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-950">
                  Comprehensive Cleaning Portfolio
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Select any service below to view full specifications, equipment details, and request itemized quotes.
                </p>
              </div>
            </div>

            {/* 6 Photo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service) => {
                const IconComp = iconMap[service.iconName] || Building2;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-blue-500 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* High-res Image Top */}
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <span className="bg-navy-950/90 text-cyanAccent text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-cyanAccent/30">
                            DIVISION {service.number}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold font-display leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 pb-2">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                          {service.shortDescription}
                        </p>

                        {/* Checklist */}
                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          {service.scopeChecklist.slice(0, 3).map((check, i) => (
                            <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                              <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{check}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-6 pt-3 flex items-center justify-between border-t border-slate-100 mt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-bold text-navy-950 group-hover:text-blue-600 flex items-center space-x-1 uppercase tracking-wider transition-colors"
                      >
                        <span>Full Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href={`/services/${service.slug}#quote-section`}
                        className="text-xs font-bold bg-navy-950 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl transition-colors"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TARGET SECTORS PHOTO BENTO */}
        {/* ========================================================================= */}
        <section className="py-24 bg-navy-950 text-white relative overflow-hidden border-t border-navy-900">
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-bold bg-navy-900 border border-slate-700 px-3 py-1 rounded-full inline-block mb-3">
                02 // SECTOR DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
                Who We Serve in Kimberley
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TARGET_MARKETS.map((sector, idx) => (
                <div 
                  key={idx}
                  className="relative h-64 rounded-3xl overflow-hidden group border border-slate-800"
                >
                  <Image
                    src={sector.imageUrl}
                    alt={sector.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyanAccent text-navy-950 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                      {sector.sector}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-display mb-1">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 font-light">
                      {sector.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIRECT QUOTE BANNER */}
        <section className="py-20 px-4 bg-white text-center border-t border-slate-200">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 mb-4">
              Need a Custom Commercial Proposal?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              From once-off deep sanitisation to long-term contract cleaning and chemical replenishment, our team is ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-glow-blue transition text-xs uppercase tracking-wider"
              >
                Schedule Free Site Inspection
              </Link>
              <Link
                href="/toilet-paper"
                className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-8 py-3.5 rounded-xl transition text-xs uppercase tracking-wider border border-slate-200"
              >
                Toilet Paper &amp; Store Supplies
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
