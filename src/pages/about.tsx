import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { 
  Building2, Sparkles, Home as HomeIcon, Shirt, SprayCan, Droplets, 
  ShieldCheck, HeartHandshake, Award, Target, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { SERVICES_DATA, COMPETITIVE_ADVANTAGES } from '@/data/servicesData';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Moon Soft | Where Quality Meets Care</title>
        <meta 
          name="description" 
          content="Learn about Moon Soft - Kimberley & Northern Cape's premier cleaning services provider and manufacturer of high-quality toilet paper and professional cleaning chemicals." 
        />
      </Head>

      <div className="min-h-screen bg-slate-50 text-navy-950">
        {/* Editorial Hero */}
        <section className="relative bg-navy-950 text-white pt-16 pb-24 px-4 overflow-hidden border-b border-navy-900">
          <div className="absolute inset-0 z-0 opacity-10 swiss-dark-grid" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-navy-900 border border-slate-700 rounded-full px-4 py-1.5 mb-6 text-xs font-mono uppercase tracking-widest text-cyanAccent">
              <span>EST. KIMBERLEY, NORTHERN CAPE</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
                Where Quality <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-blue-400 to-white">
                  Meets Care.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                Moon Soft is an integrated hygiene enterprise dedicated to delivering enterprise-grade commercial cleaning services, hospital-level sanitisation, and high-quality paper and chemical manufacturing across the Northern Cape.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Mission & Story */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
                  Our Mission & Vision
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
                  Transforming standard maintenance into an exact science of comfort, health, and dignity.
                </h2>
                <p className="text-slate-600 text-base leading-relaxed font-normal">
                  Founded with a vision to uplift hygiene standards throughout the Northern Cape, Moon Soft provides both direct service excellence and certified supply security. We empower businesses, medical institutions, and residential clients with reliable service agreements and eco-friendly products.
                </p>
                <p className="text-slate-600 text-base leading-relaxed font-normal">
                  Our philosophy is simple: clean spaces elevate human potential. When your workplace or home is immaculate, air quality improves, productivity rises, and visitors feel instant comfort.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center space-x-2 bg-navy-950 hover:bg-navy-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition text-sm"
                  >
                    <span>Explore Our 6 Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/toilet-paper"
                    className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-6 py-3.5 rounded-xl transition text-sm"
                  >
                    <span>Paper Products Hub</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                      THE 4 CORE PILLARS
                    </span>
                    <h3 className="text-xl font-bold text-navy-950 mt-1">The Moon Soft Standard</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
                      <h4 className="font-bold text-sm text-navy-950">Vetted Personnel</h4>
                      <p className="text-xs text-slate-600 mt-1">Strict background vetting, ongoing chemical safety training, and site supervision.</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <Sparkles className="w-6 h-6 text-cyanAccent mb-2" />
                      <h4 className="font-bold text-sm text-navy-950">Hospital-Grade Potency</h4>
                      <p className="text-xs text-slate-600 mt-1">SABS-compliant virucidal and antibacterial formulas safe for humans and pets.</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <Award className="w-6 h-6 text-blue-600 mb-2" />
                      <h4 className="font-bold text-sm text-navy-950">Transparent Pricing</h4>
                      <p className="text-xs text-slate-600 mt-1">Itemized service level agreements with zero hidden costs or retainers.</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <HeartHandshake className="w-6 h-6 text-cyanAccent mb-2" />
                      <h4 className="font-bold text-sm text-navy-950">Northern Cape Focus</h4>
                      <p className="text-xs text-slate-600 mt-1">Dedicated Kimberley depot providing rapid response and localized supply.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Service & Product Architecture */}
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                Dual Divisions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950">
                A Unified Hygiene Ecosystem
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Division 1: Cleaning Services */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">DIVISION 01</span>
                  <h3 className="text-2xl font-bold text-navy-950 mt-1 mb-3">
                    Professional Cleaning Services
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Contract cleaning, deep sanitisation, post-construction builders cleans, carpet hydro-extraction, and commercial window detailing for facilities in Kimberley.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Scheduled daily/weekly shift rotas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Dedicated on-site supervisors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Turnkey handover certifications</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link href="/services" className="text-sm font-bold text-blue-600 hover:underline flex items-center space-x-1">
                    <span>View 6 Cleaning Divisions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Division 2: Paper & Chemical Supplies */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-cyanAccent uppercase tracking-widest font-bold">DIVISION 02</span>
                  <h3 className="text-2xl font-bold text-navy-950 mt-1 mb-3">
                    Paper & Chemical Supplies
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Direct-from-factory Moon Soft ultra-soft 1-ply and 2-ply toilet paper, bulk dispensers, and certified commercial cleaning chemicals.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Ultra-absorbent 100% skin-safe paper</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Concentrated 5L / 25L bulk chemical packs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Fast regional delivery across Northern Cape</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link href="/toilet-paper" className="text-sm font-bold text-blue-600 hover:underline flex items-center space-x-1">
                    <span>Explore Paper & Store Inventory</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 bg-navy-950 text-white text-center border-t border-navy-900">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Partner with Moon Soft Today</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Let us tailor a cleaning agreement or consumable delivery schedule to your facility's exact requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-cyanAccent hover:bg-cyanAccent-dark text-navy-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition"
            >
              Get In Touch With Our Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
