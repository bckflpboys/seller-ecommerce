import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Building2, Sparkles, Home, Shirt, SprayCan, Droplets, 
  CheckCircle2, ArrowRight, Clock, ShieldCheck, HelpCircle, 
  Send, Phone, Mail, MapPin, ChevronRight, FileText, Check, ArrowUpRight, Award, Zap
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '@/data/servicesData';

import MetaSEO from '@/components/MetaSEO';

interface ServiceDetailProps {
  service: ServiceItem;
  otherServices: { slug: string; title: string; number: string; iconName: string; imageUrl: string; subtitle: string }[];
}

const iconMap: Record<string, any> = {
  Building2,
  Sparkles,
  Home,
  Shirt,
  SprayCan,
  Droplets
};

export default function ServiceDetailPage({ service, otherServices }: ServiceDetailProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    facilityType: 'Corporate Office',
    areaScale: 'Medium (150 - 450 m²)',
    frequency: 'Daily Contract',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const IconComponent = iconMap[service.iconName] || Building2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success(`Quote request for ${service.title} sent successfully! We will contact you shortly.`);
    }, 700);
  };

  return (
    <>
      <MetaSEO
        title={`${service.title} Kimberley & Northern Cape | Moon Soft`}
        description={`Moon Soft ${service.title}: ${service.shortDescription} Kimberley & Northern Cape trusted cleaning division. Vetted staff, SABS chemicals & transparent SLA.`}
        canonicalUrl={`https://www.moonsoft.life/services/${service.slug}`}
        ogImage={service.imageUrl}
        faqs={service.faqs}
        serviceSchema={{
          name: service.title,
          serviceType: service.subtitle,
          description: service.fullDescription,
          priceStarting: service.pricingStartingAt,
          areaServed: ['Kimberley', 'Northern Cape', 'South Africa']
        }}
        keywords={[
          `${service.title} Kimberley`,
          `${service.title} Northern Cape`,
          `${service.title} South Africa`,
          'Commercial cleaning Kimberley',
          'Moon Soft cleaning division'
        ]}
      />

      <div className="bg-slate-50 min-h-screen font-sans text-navy-950">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: Photographic Banner with Swiss Typography */}
        {/* ========================================================================= */}
        <section className="relative bg-navy-950 text-white border-b border-navy-900 pt-10 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              priority
              loading="eager"
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
          <div className="absolute inset-0 z-0 opacity-10 swiss-dark-grid pointer-events-none" />
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest font-mono text-slate-400 mb-6">
              <Link href="/" className="hover:text-cyanAccent transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-cyanAccent transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-cyanAccent font-semibold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-mono text-cyanAccent text-xs font-bold tracking-widest bg-navy-900/90 border border-cyanAccent/40 px-3 py-1 rounded-full uppercase">
                    DIVISION {service.number} // KIMBERLEY DEPOT
                  </span>
                  {service.featuredBadge && (
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {service.featuredBadge}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-3xl leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
                <div className="bg-navy-900/95 border border-slate-800 rounded-3xl p-6 w-full max-w-sm backdrop-blur-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>TURNAROUND</span>
                    <span className="text-cyanAccent font-bold">{service.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                    <span>STAFF</span>
                    <span className="text-white font-bold">100% Vetted &amp; Insured</span>
                  </div>
                  <a
                    href="#quote-section"
                    className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all inline-block text-xs uppercase tracking-wider shadow-glow-blue"
                  >
                    Request Free Estimate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN BODY: Visual Bento Left + Quote Form Right */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Bento Cards & Scope Specs */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Visual Bento Split Card: Overview + Secondary Photo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Photo Card 1 */}
                  <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-cyanAccent font-mono text-[11px] font-bold block mb-1">ON-SITE EXECUTION</span>
                      <h3 className="font-bold text-base sm:text-lg leading-snug">{service.title}</h3>
                    </div>
                  </div>

                  {/* Photo Card 2 */}
                  <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
                    <Image
                      src={service.secondaryImageUrl}
                      alt="Workplace cleanliness"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-cyanAccent font-mono text-[11px] font-bold block mb-1">NORTHERN CAPE SPEC</span>
                      <h3 className="font-bold text-base sm:text-lg leading-snug">{service.tagline}</h3>
                    </div>
                  </div>

                </div>

                {/* Scope of Work Bento Box */}
                <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">DELIVERABLES</span>
                      <h2 className="text-2xl font-display font-extrabold text-navy-950 mt-1">Included Scope of Work</h2>
                    </div>
                    <span className="text-xs font-mono bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full">
                      6-POINT AUDIT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.scopeChecklist.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/40 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-blue-700 font-bold" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Step Operational Framework Bento */}
                <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">METHODOLOGY</span>
                  <h2 className="text-2xl font-display font-extrabold text-navy-950">Our 4-Step Standard of Care</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.processSteps.map((step, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-navy-950 text-white relative overflow-hidden">
                        <span className="text-xs font-mono text-cyanAccent uppercase tracking-widest font-bold block mb-1">
                          PHASE {step.step}
                        </span>
                        <h4 className="text-base font-bold text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment & Guarantees Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center space-x-2 text-blue-600 mb-4">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-navy-950 text-base">Certified Equipment</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {service.equipmentAndChemicals.map((eq, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center space-x-2 text-blue-600 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-navy-950 text-base">Quality Guarantees</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {service.keyBenefits.map((ben, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent mt-1.5 flex-shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-6 h-6 text-navy-950" />
                    <div>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">KNOWLEDGE BASE</span>
                      <h3 className="text-xl font-display font-bold text-navy-950">Frequently Asked Questions</h3>
                    </div>
                  </div>

                  <div className="space-y-4 divide-y divide-slate-100">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className={index !== 0 ? 'pt-4' : ''}>
                        <h4 className="text-sm font-bold text-navy-950 mb-1">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Quote Form & Contact Card (Clean relative flow, zero overlapping!) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Instant Quote Form */}
                <div id="quote-section" className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
                  <div className="border-b border-slate-800 pb-4 mb-6">
                    <span className="text-xs font-mono tracking-widest text-cyanAccent uppercase block mb-1 font-bold">
                      DIRECT INQUIRY
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Request a Custom Quote
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Tailored for {service.title} in Kimberley.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="bg-navy-950/80 border border-cyanAccent/40 rounded-2xl p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-cyanAccent/20 text-cyanAccent flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Request Received!</h4>
                      <p className="text-xs text-slate-300">
                        Our regional supervisor will contact you within 2 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs text-cyanAccent underline hover:text-white"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sipho Ndlovu"
                          className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.co.za"
                            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+27 788 8401"
                            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Company / Facility Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Office Park / Residence"
                          className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Facility Type
                          </label>
                          <select
                            value={formData.facilityType}
                            onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyanAccent"
                          >
                            <option>Corporate Office</option>
                            <option>Healthcare / Clinic</option>
                            <option>School / College</option>
                            <option>Retail / Shopfront</option>
                            <option>Hospitality / Lodge</option>
                            <option>Residential Property</option>
                            <option>Construction Handover</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Schedule
                          </label>
                          <select
                            value={formData.frequency}
                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                            className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyanAccent"
                          >
                            <option>Daily Contract</option>
                            <option>Weekly Schedule</option>
                            <option>Bi-Weekly</option>
                            <option>Once-Off Intensive</option>
                            <option>Monthly Retainer</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Approx. Area Size / Notes
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="e.g. 450 sqm double-story office with 12 workstations..."
                          className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyanAccent"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-glow-blue transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-xs uppercase tracking-wider mt-2"
                      >
                        {isSubmitting ? (
                          <span>Processing Estimate...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Quote Request</span>
                          </>
                        )}
                      </button>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span>Direct Hotline:</span>
                        <a href="tel:+277888401" className="text-cyanAccent font-semibold hover:underline">
                          +27 788 8401
                        </a>
                      </div>
                    </form>
                  )}
                </div>

                {/* Direct Depot Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-3 text-navy-950">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-sm">Moon Soft Kimberley Depot</h4>
                      <p className="text-xs text-slate-500">4139 Sehurutsi Street, Kimberley</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-navy-950">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-sm">24/7 Operations Line</h4>
                      <a href="tel:+277888401" className="text-xs text-blue-600 font-semibold hover:underline">+27 788 8401</a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* OTHER CLEANING DIVISIONS: Full-Width Visual Bento Showcase at Bottom */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-7xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1 rounded-full inline-block mb-3">
                  EXPLORE OTHER DIVISIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
                  More Specialized Services
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Discover our full range of enterprise hygiene solutions across Kimberley and the Northern Cape.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 bg-navy-950 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition text-xs uppercase tracking-wider shadow-md"
                >
                  <span>Explore Full Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 5 Other Services Photo Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {otherServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className="relative h-60 rounded-3xl overflow-hidden group border border-slate-200 shadow-sm hover:shadow-card-hover transition-all block flex flex-col justify-end p-5"
                >
                  <Image
                    src={srv.imageUrl}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy-950/80 text-cyanAccent font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-cyanAccent/30">
                      DIV {srv.number}
                    </span>
                  </div>

                  <div className="relative z-10 text-white">
                    <h4 className="text-sm font-bold font-display group-hover:text-cyanAccent transition-colors leading-snug mb-1">
                      {srv.title}
                    </h4>
                    <span className="text-[11px] text-slate-300 flex items-center space-x-1 font-semibold">
                      <span>View Scope</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SERVICES_DATA.map((srv) => ({
    params: { slug: srv.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      notFound: true
    };
  }

  const otherServices = SERVICES_DATA.filter((s) => s.slug !== slug).map((s) => ({
    slug: s.slug,
    title: s.title,
    number: s.number,
    iconName: s.iconName,
    imageUrl: s.imageUrl,
    subtitle: s.subtitle
  }));

  return {
    props: {
      service,
      otherServices
    }
  };
};
