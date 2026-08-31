import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Commercial Cleaning Inquiry',
    service: 'Contract Cleaning',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Thank you! Your message has been sent to Moon Soft Kimberley.');
    }, 700);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Contact Moon Soft | Kimberley & Northern Cape</title>
        <meta 
          name="description" 
          content="Contact Moon Soft for commercial cleaning quotes, site surveys, toilet paper wholesale orders, and chemical supply in Kimberley and Northern Cape." 
        />
      </Head>

      <div className="min-h-screen bg-slate-50 font-sans text-navy-950">
        
        {/* Editorial Hero */}
        <section className="relative bg-navy-950 text-white pt-16 pb-24 px-4 overflow-hidden border-b border-navy-900">
          <div className="absolute inset-0 z-0 opacity-15 swiss-dark-grid pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-navy-900 border border-slate-700 rounded-full px-4 py-1.5 mb-6 text-xs font-mono uppercase tracking-widest text-cyanAccent">
              <span>DIRECT HYGIENE CONSULTATION</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight mb-4">
                Let’s Discuss Your Cleaning <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-blue-300 to-white">
                  &amp; Hygiene Requirements.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Whether you need a full-time contract cleaning crew, an emergency deep sanitisation, or bulk factory direct paper supplies, we are ready to assist.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left: Contact Info & Map */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">KIMBERLEY HUB</span>
                    <h2 className="text-2xl font-display font-bold text-navy-950 mt-1">
                      Our Depot Details
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-navy-950">Physical Address</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">4139 Sehurutsi Street, Kimberley, Northern Cape</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-navy-950">Phone Number</h3>
                        <a href="tel:+277888401" className="text-xs sm:text-sm text-blue-600 font-semibold hover:underline block mt-0.5">+27 788 8401</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-navy-950">Email Inquiries</h3>
                        <a href="mailto:sales@moonsoft.life" className="text-xs sm:text-sm text-blue-600 font-semibold hover:underline block mt-0.5">sales@moonsoft.life</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-navy-950">Operational Hours</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Mon - Fri: 8:00 AM - 5:00 PM (Cleaning crews 24/7 on contract)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
                  <div className="relative h-[260px] rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.744772826592!2d24.75!3d-28.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b0dd60e75d84d%3A0x7c0b7a3d12345678!2s4139%20Sehurutsi%20Street%2C%20Kimberley%2C%20Northern%20Cape!5e0!3m2!1sen!2sza!4v1678451234567!5m2!1sen!2sza"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Moon Soft Location Map"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Message / Quote Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                  <div className="border-b border-slate-100 pb-4 mb-8">
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                      INQUIRY DESK
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-950 mt-1">
                      Send a Message or Quote Request
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill in the details below and an operations supervisor will contact you directly.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy-950">Thank You!</h3>
                      <p className="text-slate-600 max-w-md mx-auto text-sm">
                        Your message has been safely received. We will review your specifications and get in touch promptly.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 inline-block text-xs font-bold text-blue-600 uppercase tracking-wider underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Sipho Ndlovu"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.co.za"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+27 788 8401"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Service Area / Need
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option>Contract Cleaning</option>
                            <option>Deep Cleaning & Sanitisation</option>
                            <option>Post-Construction Handover Clean</option>
                            <option>Carpet & Upholstery Cleaning</option>
                            <option>Window Detailing</option>
                            <option>Cleaning Chemicals & Supplies</option>
                            <option>Toilet Paper Wholesale Orders</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                          Message &amp; Facility Notes
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide any details on your property layout, location, frequency or scope..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy-950 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-navy-950 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Dispatch Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
