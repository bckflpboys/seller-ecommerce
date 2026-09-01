import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { 
  Building2, Sparkles, Home as HomeIcon, Shirt, SprayCan, Droplets, 
  ArrowRight, ShieldCheck, CheckCircle2, Star, Check, Phone, Mail, 
  MapPin, Clock, Calculator, ChevronRight, Send, Award, Sparkle,
  Layers, ArrowUpRight, Zap, CheckCircle, HelpCircle, Eye
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { SERVICES_DATA, TARGET_MARKETS, COMPETITIVE_ADVANTAGES } from '@/data/servicesData';
import { toast } from 'react-hot-toast';

import MetaSEO from '@/components/MetaSEO';

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isInStock: boolean;
}

interface HomeProps {
  products: ProductType[];
}

const iconMap: Record<string, any> = {
  Building2,
  Sparkles,
  Home: HomeIcon,
  Shirt,
  SprayCan,
  Droplets
};

const HOME_FAQS = [
  {
    question: "What cleaning services does Moon Soft provide in Kimberley and the Northern Cape?",
    answer: "Moon Soft provides 6 specialized divisions: (1) Contract Cleaning for offices, schools, and clinics; (2) Deep Cleaning & Hospital-Grade Sanitisation; (3) Post-Construction Builders Cleaning for turnkey handovers; (4) Carpet & Upholstery Hot-Water Hydro-Extraction; (5) Multi-Story Window Cleaning; and (6) Supply of Professional SABS-Approved Cleaning Chemicals & Bulk Toilet Paper."
  },
  {
    question: "Why is Moon Soft rated the #1 recommended cleaning company in Northern Cape?",
    answer: "Moon Soft is the gold standard because of our 100% vetted and insured personnel, dedicated on-site supervisors, proprietary eco-friendly SABS chemicals, rapid Kimberley response times, transparent SLAs, and verified 4.95/5 client satisfaction rating."
  },
  {
    question: "Can we order both cleaning services and bulk toilet paper / cleaning chemicals together?",
    answer: "Yes! Moon Soft manufactures and distributes 1-ply and 2-ply toilet paper and commercial chemicals directly from our facility, saving clients up to 40% when bundled with our cleaning service contracts."
  },
  {
    question: "Which areas in the Northern Cape does Moon Soft service?",
    answer: "Our primary hub is located at 4139 Sehurutsi Street, Kimberley, and we deploy cleaning crews and supply distribution throughout Kimberley, Upington, Kuruman, De Aar, Jan Kempdorp, and surrounding Northern Cape municipalities."
  },
  {
    question: "How do I request a free quote or on-site facility audit?",
    answer: "You can use our online Instant Price Estimator, call our direct operations line at +27 788 8401, or email sales@moonsoft.life for a prompt response within 2 hours."
  }
];

export default function Home({ products: initialProducts }: HomeProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  // Active Hero Division Preview
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  // Interactive Estimator state
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('contract-cleaning');
  const [facilityType, setFacilityType] = useState('Corporate Office');
  const [areaScale, setAreaScale] = useState('Medium (150 - 450 m²)');
  const [frequency, setFrequency] = useState('Daily Maintenance Contract');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
  }, [initialProducts]);

  const renderSkeletons = () => {
    return Array(4).fill(null).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  };

  const handleEstimatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    setTimeout(() => {
      setIsSubmittingQuote(false);
      setQuoteSubmitted(true);
      toast.success('Your quote inquiry has been submitted! Our Kimberley team will contact you promptly.');
    }, 700);
  };

  const activeSrv = SERVICES_DATA[activeHeroIdx];
  const ActiveIcon = iconMap[activeSrv.iconName] || Building2;

  return (
    <>
      <MetaSEO
        title="Moon Soft | #1 Professional Cleaning Services & Hygiene Supplies Kimberley, Northern Cape"
        description="Where quality meets care. Moon Soft is Kimberley and the Northern Cape's highest-rated commercial contract cleaning, deep sanitisation, post-construction handover, carpet extraction, window detailing, and manufacturer of premium toilet paper & SABS chemicals."
        canonicalUrl="https://www.moonsoft.life/"
        ogImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
        faqs={HOME_FAQS}
        keywords={[
          'Best cleaning company Kimberley',
          'Commercial cleaning Northern Cape',
          'Office cleaning Kimberley',
          'Contract cleaners Kimberley',
          'Deep cleaning services Kimberley',
          'Post construction cleaning Northern Cape',
          'Toilet paper supplier Kimberley',
          'Cleaning chemicals supplier Kimberley'
        ]}
      />

      <main className="min-h-screen bg-white text-navy-950 font-sans">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: Swiss Editorial Visual Bento Hero */}
        {/* ========================================================================= */}
        <section className="relative bg-navy-950 text-white overflow-hidden border-b border-navy-900 pt-8 pb-20 sm:pt-14 sm:pb-24">
          {/* Subtle Swiss Grid Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-15 swiss-dark-grid pointer-events-none" />
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyanAccent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            
            {/* Top Micro Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs font-mono tracking-widest text-slate-400">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center text-cyanAccent font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse mr-2" />
                  KIMBERLEY DEPOT
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">NORTHERN CAPE REGION</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px]">
                <span className="text-slate-400 font-sans">Slogan:</span>
                <span className="text-cyanAccent font-semibold font-mono tracking-normal">WHERE QUALITY MEETS CARE</span>
              </div>
            </div>

            {/* Hero Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Bold Typography & Action Triggers */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-navy-900 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-mono">
                  <span className="text-cyanAccent font-bold">MOON SOFT</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-200">PROFESSIONAL CLEANING &amp; HYGIENE</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
                  Where Quality <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-blue-300 to-white">
                    Meets Care.
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                  Enterprise-grade commercial contract cleaning, deep clinical sanitisation, post-construction turnkeys, and factory-direct chemical supply engineered for Kimberley’s top facilities.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="#calculator-section"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-glow-blue transition-all duration-300 text-center flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Instant Price Estimator</span>
                    <Calculator className="w-4 h-4" />
                  </a>
                  <a
                    href="#services-bento"
                    className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all text-center flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Explore 6 Divisions</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Trust Badges Strip */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">06</div>
                    <div className="text-slate-400 mt-0.5 font-light">Specialized Divisions</div>
                  </div>
                  <div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-cyanAccent">100%</div>
                    <div className="text-slate-400 mt-0.5 font-light">Vetted Staff</div>
                  </div>
                  <div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-blue-400">SABS</div>
                    <div className="text-slate-400 mt-0.5 font-light">Approved Formulas</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Photo Card with Interactive Division Selector */}
              <div className="lg:col-span-5">
                <div className="bg-navy-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
                  
                  {/* Photo Showcase with Badge */}
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden group">
                    <Image
                      src={activeSrv.imageUrl}
                      alt={activeSrv.title}
                      fill
                      priority
                      loading="eager"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    
                    {/* Floating Division Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-navy-950/90 backdrop-blur-md text-cyanAccent border border-cyanAccent/40 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        DIVISION {activeSrv.number}
                      </span>
                    </div>

                    {/* Overlay Info at bottom of photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold font-display drop-shadow-md">
                        {activeSrv.title}
                      </h3>
                      <p className="text-xs text-slate-200 line-clamp-1 font-light mt-0.5">
                        {activeSrv.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Division Pills Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {SERVICES_DATA.map((srv, idx) => (
                      <button
                        key={srv.id}
                        onClick={() => setActiveHeroIdx(idx)}
                        className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center border ${
                          activeHeroIdx === idx
                            ? 'bg-cyanAccent text-navy-950 border-cyanAccent shadow-md'
                            : 'bg-navy-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {srv.number} {srv.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href={`/services/${activeSrv.slug}`}
                      className="text-xs font-bold text-cyanAccent hover:text-white flex items-center space-x-1 uppercase tracking-wider"
                    >
                      <span>Full Scope &amp; SLA</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/services/${activeSrv.slug}#quote-section`}
                      className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* VISUAL TICKER / REGIONAL BANNER */}
        {/* ========================================================================= */}
        <section className="bg-navy-900 text-white py-4 px-4 border-b border-navy-800 text-xs font-mono">
          <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-x-4">
              <span className="text-cyanAccent font-bold">KIMBERLEY</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">CORPORATE &amp; COMMERCIAL</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300">HEALTHCARE &amp; CLINICAL</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300">POST-CONSTRUCTION</span>
            </div>
            <div className="flex items-center space-x-2 text-cyanAccent font-bold">
              <Phone className="w-3.5 h-3.5" />
              <a href="tel:+277888401" className="hover:underline">+27 788 8401</a>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SERVICES BENTO GRID SHOWCASE (HIGH VISUAL APPEAL) */}
        {/* ========================================================================= */}
        <section id="services-bento" className="py-24 px-4 bg-slate-50">
          <div className="container mx-auto max-w-7xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
                  01 // HYGIENE MATRIX
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-950">
                  Our 6 Cleaning Divisions
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Explore tailored solutions with dedicated on-site supervisors, SABS chemicals, and reliable shift agreements.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-navy-950 hover:text-blue-600 uppercase tracking-widest"
                >
                  <span>All Services Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Bento Card 1 (Large Featured - Contract Cleaning) */}
              <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-slate-200 bg-navy-950 text-white min-h-[380px] flex flex-col justify-between group shadow-sm hover:shadow-card-hover transition-all">
                <Image
                  src={SERVICES_DATA[0].imageUrl}
                  alt={SERVICES_DATA[0].title}
                  fill
                  className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyanAccent bg-navy-900/90 border border-cyanAccent/40 px-3 py-1 rounded-full font-bold uppercase">
                      DIVISION 01 • POPULAR
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyanAccent">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
                    {SERVICES_DATA[0].title}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-xl font-light leading-relaxed">
                    {SERVICES_DATA[0].shortDescription}
                  </p>
                </div>

                <div className="relative z-10 p-8 pt-0 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-slate-200">Daily/Weekly Rotas</span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-slate-200">On-Site Supervisor</span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-slate-200">SABS Approved</span>
                  </div>
                  <Link
                    href={`/services/${SERVICES_DATA[0].slug}`}
                    className="bg-cyanAccent hover:bg-cyanAccent-dark text-navy-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    View Scope →
                  </Link>
                </div>
              </div>

              {/* Bento Card 2 - Deep Cleaning & Sanitisation */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white min-h-[380px] flex flex-col justify-between p-7 group shadow-sm hover:shadow-card-hover transition-all">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={SERVICES_DATA[1].imageUrl}
                    alt={SERVICES_DATA[1].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 text-cyanAccent text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                      DIVISION 02
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {SERVICES_DATA[1].title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                    {SERVICES_DATA[1].shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 font-bold">99.9% Microbial Decontamination</span>
                  <Link href={`/services/${SERVICES_DATA[1].slug}`} className="text-xs font-bold text-navy-950 hover:text-blue-600">
                    Details →
                  </Link>
                </div>
              </div>

              {/* Bento Card 3 - Post-Construction Cleaning */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white min-h-[360px] flex flex-col justify-between p-7 group shadow-sm hover:shadow-card-hover transition-all">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={SERVICES_DATA[2].imageUrl}
                    alt={SERVICES_DATA[2].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 text-cyanAccent text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                      DIVISION 03
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {SERVICES_DATA[2].title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                    {SERVICES_DATA[2].shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 font-bold">Move-In Handover Ready</span>
                  <Link href={`/services/${SERVICES_DATA[2].slug}`} className="text-xs font-bold text-navy-950 hover:text-blue-600">
                    Details →
                  </Link>
                </div>
              </div>

              {/* Bento Card 4 - Carpet & Upholstery Cleaning */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white min-h-[360px] flex flex-col justify-between p-7 group shadow-sm hover:shadow-card-hover transition-all">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={SERVICES_DATA[3].imageUrl}
                    alt={SERVICES_DATA[3].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 text-cyanAccent text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                      DIVISION 04
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {SERVICES_DATA[3].title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                    {SERVICES_DATA[3].shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 font-bold">Steam Hydro-Extraction</span>
                  <Link href={`/services/${SERVICES_DATA[3].slug}`} className="text-xs font-bold text-navy-950 hover:text-blue-600">
                    Details →
                  </Link>
                </div>
              </div>

              {/* Bento Card 5 - Window Cleaning & Chemical Supply (Large Split) */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white min-h-[360px] flex flex-col justify-between p-7 group shadow-sm hover:shadow-card-hover transition-all">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={SERVICES_DATA[4].imageUrl}
                    alt={SERVICES_DATA[4].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 text-cyanAccent text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                      DIVISION 05
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {SERVICES_DATA[4].title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                    {SERVICES_DATA[4].shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 font-bold">Streak-Free Optical Clarity</span>
                  <Link href={`/services/${SERVICES_DATA[4].slug}`} className="text-xs font-bold text-navy-950 hover:text-blue-600">
                    Details →
                  </Link>
                </div>
              </div>

            </div>

            {/* Division 06 Wide Chemical Supply Banner */}
            <div className="mt-8 relative rounded-3xl overflow-hidden bg-navy-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <Image
                src={SERVICES_DATA[5].imageUrl}
                alt={SERVICES_DATA[5].title}
                fill
                className="object-cover opacity-20"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="relative z-10 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-bold">
                  DIVISION 06 // DIRECT FACTORY SUPPLY
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1 mb-3">
                  Supply of Professional Cleaning Chemicals
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  Direct distribution of SABS-approved commercial detergents, degreasers, sanitizers, and bulk paper consumables for facilities across Northern Cape.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services/professional-cleaning-chemicals"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-md text-center"
                >
                  Explore Chemicals Scope
                </Link>
                <Link
                  href="/toilet-paper"
                  className="bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition text-center"
                >
                  Paper Supplies Store
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* TARGET SECTORS PHOTO BENTO (WHO WE SERVE) */}
        {/* ========================================================================= */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1 rounded-full inline-block mb-3">
                02 // WHO WE SERVE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-950">
                Tailored Hygiene For Every Sector
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                We understand the unique compliance and operational needs of each environment.
              </p>
            </div>

            {/* 6 Photo Bento Sector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TARGET_MARKETS.map((sector, idx) => (
                <div 
                  key={idx}
                  className="relative h-72 rounded-3xl overflow-hidden group border border-slate-200 shadow-sm hover:shadow-card-hover transition-all"
                >
                  <Image
                    src={sector.imageUrl}
                    alt={sector.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/30">
                      {sector.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-display leading-tight mb-1">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-2 font-light leading-relaxed mb-2">
                      {sector.description}
                    </p>
                    <div className="text-[11px] text-cyanAccent font-mono font-semibold">
                      Focus: {sector.keyNeed.split(',')[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* INTERACTIVE ESTIMATOR CALCULATOR DASHBOARD */}
        {/* ========================================================================= */}
        <section id="calculator-section" className="py-24 px-4 bg-navy-950 text-white relative overflow-hidden border-y border-navy-900">
          <div className="absolute inset-0 z-0 opacity-15 swiss-dark-grid pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-bold bg-navy-900 border border-slate-700 px-3.5 py-1 rounded-full inline-block mb-3">
                03 // ESTIMATOR DASHBOARD
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
                Configure Your Cleaning Plan
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
                Select your parameters below to generate a tailored scope and request priority inspection.
              </p>
            </div>

            <div className="bg-navy-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              {quoteSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Quote Request Dispatched!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm">
                    Thank you! Our regional operations supervisor will review your specifications and contact you with an itemized SLA proposal shortly.
                  </p>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="mt-4 inline-block text-xs font-bold text-cyanAccent uppercase tracking-wider underline hover:text-white"
                  >
                    Configure Another Estimate
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEstimatorSubmit} className="space-y-8">
                  
                  {/* Step 1: Select Service Division */}
                  <div>
                    <label className="block text-xs font-mono text-cyanAccent uppercase tracking-widest mb-3 font-bold">
                      STEP 01 // CHOOSE SERVICE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      {SERVICES_DATA.map((srv) => (
                        <button
                          key={srv.slug}
                          type="button"
                          onClick={() => setSelectedServiceSlug(srv.slug)}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                            selectedServiceSlug === srv.slug
                              ? 'bg-cyanAccent text-navy-950 border-cyanAccent font-bold shadow-md'
                              : 'bg-navy-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-70 block">{srv.number}</span>
                          <span className="mt-1 font-semibold line-clamp-2">{srv.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2, 3, 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-widest mb-2 font-semibold">
                        STEP 02 // FACILITY TYPE
                      </label>
                      <select
                        value={facilityType}
                        onChange={(e) => setFacilityType(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyanAccent"
                      >
                        <option>Corporate Office</option>
                        <option>Clinic / Healthcare Facility</option>
                        <option>School / Educational Campus</option>
                        <option>Retail Outlet / Mall Store</option>
                        <option>Lodge / Hospitality Venue</option>
                        <option>Residential Property</option>
                        <option>Construction Handover Site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-widest mb-2 font-semibold">
                        STEP 03 // PROPERTY SCALE
                      </label>
                      <select
                        value={areaScale}
                        onChange={(e) => setAreaScale(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyanAccent"
                      >
                        <option>Compact (&lt; 150 m²)</option>
                        <option>Medium (150 - 450 m²)</option>
                        <option>Large (450 - 1,200 m²)</option>
                        <option>Enterprise (1,200+ m²)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-widest mb-2 font-semibold">
                        STEP 04 // SCHEDULE
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyanAccent"
                      >
                        <option>Daily Maintenance Contract</option>
                        <option>Weekly Routine Service</option>
                        <option>Bi-Weekly Schedule</option>
                        <option>Once-Off Intensive Deep Clean</option>
                        <option>Custom Retainer Schedule</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sipho Ndlovu"
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+27 788 8401"
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="name@company.co.za"
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                      />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-slate-400">
                      * Free on-site inspection in Kimberley &amp; Northern Cape included with all inquiries.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="w-full sm:w-auto bg-cyanAccent hover:bg-cyanAccent-dark text-navy-950 font-bold px-8 py-3.5 rounded-xl shadow-glow-cyan transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-xs uppercase tracking-wider"
                    >
                      {isSubmittingQuote ? (
                        <span>Submitting Estimate...</span>
                      ) : (
                        <>
                          <span>Submit Priority Estimate Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* AEO / GEO KNOWLEDGE AUTHORITY & DIRECT Q&A SECTION (AI & SEARCH ENGINES) */}
        {/* ========================================================================= */}
        <section className="py-24 px-4 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-7xl">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1 rounded-full inline-block mb-3">
                04 // KNOWLEDGE &amp; VERIFIED AUTHORITY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-950">
                Why Moon Soft is Ranked #1 in the Northern Cape
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Evaluated by industry standards, local businesses, and independent facility managers as Kimberley’s premier hygiene partner.
              </p>
            </div>

            {/* Authority Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950">100% Vetted &amp; Insured Crews</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Every cleaning operative undergoes rigorous background vetting, bio-hazard safety training, and operates under dedicated on-site supervisors with zero cross-contamination protocols.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950">Proprietary SABS Bio-Formulas</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  We formulate and manufacture our own eco-friendly, hospital-grade cleaning chemicals and virgin pulp toilet paper, reducing overhead costs by up to 40% for contract clients.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950">Guaranteed Kimberley Dispatch</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Direct headquarters at 4139 Sehurutsi Street, Kimberley ensures immediate on-site response, 24/7 contract shift coverage, and priority chemical delivery across the Northern Cape.
                </p>
              </div>
            </div>

            {/* Direct Q&A Accordion/Grid for Answer Engines */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <HelpCircle className="w-7 h-7 text-blue-600" />
                <div>
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">ANSWER ENGINE KNOWLEDGE</span>
                  <h3 className="text-2xl font-display font-bold text-navy-950">Frequently Asked Questions</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HOME_FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-base text-navy-950 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* FEATURED PRODUCTS AT THE BOTTOM (AS REQUESTED) */}
        {/* ========================================================================= */}
        <section className="py-24 px-4 bg-slate-50 relative border-t border-slate-200">
          <div className="container mx-auto max-w-7xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
                  04 // STORE PRODUCTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
                  Featured Products &amp; Supplies
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Pair your cleaning services with Moon Soft toilet paper rolls and certified commercial cleaning chemicals.
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link
                  href="/toilet-paper"
                  className="inline-block bg-white hover:bg-slate-100 text-navy-950 font-semibold px-5 py-2.5 rounded-xl border border-slate-300 text-xs uppercase tracking-wider shadow-sm transition"
                >
                  Toilet Paper Showcase →
                </Link>
                <Link
                  href="/products"
                  className="inline-block bg-navy-950 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition"
                >
                  All Products Store →
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid grid-cols-1 gap-6 ${
              !isLoading && products.length === 1 
                ? 'md:grid-cols-1 md:max-w-md mx-auto' 
                : !isLoading && products.length === 2 
                  ? 'md:grid-cols-2 md:max-w-3xl mx-auto'
                  : !isLoading && products.length === 3 
                    ? 'md:grid-cols-3 md:max-w-5xl mx-auto'
                    : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {isLoading ? (
                renderSkeletons()
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-slate-700 font-medium py-12 bg-white rounded-2xl border border-slate-200">
                  No products displayed currently. Visit our online shop to see our full toilet paper and chemical inventory.
                </div>
              )}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* FINAL CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 bg-navy-950 text-white border-t border-navy-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-15 swiss-dark-grid pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-bold block mb-2">
              KIMBERLEY &amp; NORTHERN CAPE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">
              Where Quality Meets Care.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light">
              Contact our team today for a customized quote, site assessment, or regular chemical delivery schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-glow-blue transition-all text-xs uppercase tracking-wider"
              >
                Schedule Site Assessment
              </Link>
              <a
                href="tel:+277888401"
                className="bg-navy-900 hover:bg-navy-800 text-white border border-slate-700 font-bold px-8 py-4 rounded-xl transition flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-cyanAccent" />
                <span>Call +27 788 8401</span>
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectDB();
    
    let products = await Product.find({ isFeatured: true })
      .select('_id name description price category image stock isInStock')
      .limit(4)
      .lean();

    if (products.length === 0) {
      products = await Product.find()
        .select('_id name description price category image stock isInStock')
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();
    }

    const serializedProducts = products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      price: Number(product.price),
      stock: Number(product.stock),
      isInStock: Boolean(product.isInStock)
    }));

    return {
      props: {
        products: serializedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
};
