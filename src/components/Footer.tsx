import { Mail, Phone, MapPin, Facebook, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-850">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/favi.png" alt="MoonSoft Logo" width={32} height={32} className="w-8 h-8" />
              <div className="font-display">
                <span className="text-2xl font-bold text-white">Moon</span>
                <span className="text-2xl font-bold text-cyanAccent">Soft</span>
              </div>
            </Link>
            
            <p className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-semibold">
              Where Quality Meets Care
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
              Kimberley & Northern Cape’s dedicated hygiene solutions partner. Providing professional contract cleaning, deep sanitisation, post-construction cleans, and premium paper supplies.
            </p>

            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/share/1AKpJnpXQk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-cyanAccent hover:text-navy-950 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@soilsolutionsptyltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-navy-900 hover:bg-cyanAccent hover:text-navy-950 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Cleaning Services Column */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              Cleaning Divisions
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/contract-cleaning" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  01. Contract Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/deep-cleaning-sanitisation" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  02. Deep Sanitisation
                </Link>
              </li>
              <li>
                <Link href="/services/post-construction-cleaning" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  03. Post-Construction
                </Link>
              </li>
              <li>
                <Link href="/services/carpet-upholstery-cleaning" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  04. Carpet & Upholstery
                </Link>
              </li>
              <li>
                <Link href="/services/window-cleaning" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  05. Window Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/professional-cleaning-chemicals" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  06. Chemical Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Quick Links */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              Paper & Store
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/toilet-paper" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  Toilet Paper Showcase
                </Link>
              </li>
              <li>
                <Link href="/products?category=toilet-paper" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  1-Ply & 2-Ply Paper
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  Full Store Inventory
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  About Moon Soft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyanAccent transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
              Kimberley Depot
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-cyanAccent flex-shrink-0 mt-0.5" />
                <span>4139 Sehurutsi Street, Kimberley, Northern Cape</span>
              </li>
              <li className="flex items-center space-x-2.5 text-slate-400">
                <Phone className="w-4 h-4 text-cyanAccent flex-shrink-0" />
                <a href="tel:+277888401" className="hover:text-white transition-colors">+27 788 8401</a>
              </li>
              <li className="flex items-center space-x-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-cyanAccent flex-shrink-0" />
                <a href="mailto:sales@moonsoft.life" className="hover:text-white transition-colors">sales@moonsoft.life</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Moon Soft. Where quality meets care. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end text-slate-400">
            <Link href="/privacy" className="hover:text-cyanAccent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyanAccent transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-cyanAccent transition-colors">
              Refund Policy
            </Link>
            <Link href="/shipping-policy" className="hover:text-cyanAccent transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
