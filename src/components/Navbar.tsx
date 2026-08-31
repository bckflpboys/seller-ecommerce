import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Menu, X, ChevronDown, Sparkles, Building2, Home, Shirt, SprayCan, Droplets, ArrowRight, Phone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import CartPopover from './CartPopover';
import Image from 'next/image';

const SERVICES_MENU = [
  {
    num: '01',
    title: 'Contract Cleaning',
    desc: 'Offices, schools & healthcare facilities',
    href: '/services/contract-cleaning',
    icon: Building2,
  },
  {
    num: '02',
    title: 'Deep Cleaning & Sanitisation',
    desc: 'Medical-grade intensive hygiene reset',
    href: '/services/deep-cleaning-sanitisation',
    icon: Sparkles,
  },
  {
    num: '03',
    title: 'Post-Construction Handover',
    desc: 'Builders clean & move-in detailing',
    href: '/services/post-construction-cleaning',
    icon: Home,
  },
  {
    num: '04',
    title: 'Carpet & Upholstery Extraction',
    desc: 'Deep steam stain lifting & revival',
    href: '/services/carpet-upholstery-cleaning',
    icon: Shirt,
  },
  {
    num: '05',
    title: 'Window Detailing',
    desc: 'Streak-free multi-story glass clarity',
    href: '/services/window-cleaning',
    icon: SprayCan,
  },
  {
    num: '06',
    title: 'Professional Cleaning Chemicals',
    desc: 'Direct bulk concentrates & formulas',
    href: '/services/professional-cleaning-chemicals',
    icon: Droplets,
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { state: cart } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (cartRef.current?.contains(target)) return;
      if (target.closest('.cart-popup')) return;
      setIsCartOpen(false);

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setServicesDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Notification / Hotline Bar */}
      <div className="bg-navy-950 text-slate-300 text-[11px] py-1.5 px-4 hidden sm:block border-b border-navy-900">
        <div className="container mx-auto max-w-7xl flex justify-between items-center font-mono">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-cyanAccent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse mr-1.5" />
              KIMBERLEY & NORTHERN CAPE
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">WHERE QUALITY MEETS CARE</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+277888401" className="hover:text-white flex items-center space-x-1 transition-colors">
              <Phone className="w-3 h-3 text-cyanAccent" />
              <span>+27 788 8401</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/toilet-paper" className="text-cyanAccent hover:underline">
              Toilet Paper Factory Outlet →
            </Link>
          </div>
        </div>
      </div>

      <nav className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with Modern Swiss Identity */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/favi.png" alt="MoonSoft Logo" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center font-display font-extrabold text-2xl tracking-tight leading-none">
                <span className="text-navy-950">MOON</span>
                <span className="text-blue-600">SOFT</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                Quality &amp; Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-7 text-sm font-semibold">
              
              {/* Cleaning Services Dropdown Trigger */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <Link 
                  href="/services" 
                  className={`flex items-center space-x-1.5 py-2 transition-colors ${
                    servicesDropdown ? 'text-blue-600' : 'text-navy-950 hover:text-blue-600'
                  }`}
                >
                  <span>Cleaning Services</span>
                  <span className="text-[10px] font-mono font-bold bg-navy-950 text-white px-1.5 py-0.5 rounded">06</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </Link>

                {/* Swiss Mega-Dropdown Menu */}
                {servicesDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 animate-fade-in z-50">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                          Specialized Service Divisions
                        </span>
                        <p className="text-xs text-slate-500">Commercial, institutional, and residential hygiene</p>
                      </div>
                      <Link 
                        href="/services" 
                        className="text-xs font-bold text-navy-950 hover:text-blue-600 flex items-center space-x-1"
                      >
                        <span>View All Overview</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES_MENU.map((srv) => {
                        const IconComp = srv.icon;
                        return (
                          <Link
                            key={srv.num}
                            href={srv.href}
                            className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-navy-950 group-hover:text-cyanAccent text-navy-950 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-blue-600">{srv.num}</span>
                                <h4 className="text-xs font-bold text-navy-950 group-hover:text-blue-600 transition-colors">
                                  {srv.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5 font-normal leading-tight">
                                {srv.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Dropdown Footer CTA */}
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 p-4 px-6 rounded-b-2xl flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        Need a custom scope or ongoing retainer?
                      </span>
                      <Link href="/contact" className="font-bold text-blue-600 hover:underline">
                        Book Site Assessment →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link 
                href="/toilet-paper" 
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Toilet Paper
              </Link>
              <Link 
                href="/products" 
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Products Store
              </Link>
              <Link 
                href="/about" 
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Actions: Cart, User & High-Impact Quote Pill */}
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6">
              {session?.user?.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="text-xs font-mono font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded"
                >
                  Admin
                </Link>
              )}

              {/* Cart Popover Trigger */}
              <div ref={cartRef} className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 rounded-xl text-slate-700 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {cart.itemCount}
                    </span>
                  )}
                </button>
                {isCartOpen && <CartPopover onClose={() => setIsCartOpen(false)} />}
              </div>

              {session ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/profile" 
                    className="p-2 rounded-xl text-slate-700 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                    aria-label="Account Profile"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-xs font-semibold text-slate-600 hover:text-red-600 px-2 py-1 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-xs font-bold text-slate-700 hover:text-navy-950 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* High-Impact Request Quote Button */}
              <Link
                href="/contact"
                className="bg-navy-950 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 lg:hidden">
            <div ref={cartRef} className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-slate-700 hover:text-navy-950"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </button>
              {isCartOpen && <CartPopover onClose={() => setIsCartOpen(false)} />}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-5 border-t border-slate-200 space-y-4 animate-fade-in">
            <div className="space-y-1">
              <Link 
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-bold text-navy-950 py-2"
              >
                Cleaning Services (All 6 Divisions)
              </Link>
              <div className="grid grid-cols-1 gap-1.5 pl-3 border-l-2 border-blue-500 my-2">
                {SERVICES_MENU.map((srv) => (
                  <Link
                    key={srv.num}
                    href={srv.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 py-1"
                  >
                    {srv.num}. {srv.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-sm font-semibold">
              <Link 
                href="/toilet-paper" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-slate-800 hover:text-blue-600 py-1"
              >
                Toilet Paper Products
              </Link>
              <Link 
                href="/products" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-slate-800 hover:text-blue-600 py-1"
              >
                Store Products
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-slate-800 hover:text-blue-600 py-1"
              >
                About Moon Soft
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-slate-800 hover:text-blue-600 py-1"
              >
                Contact &amp; Location
              </Link>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-navy-950 text-white text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Request a Free Quote
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200">
              {session ? (
                <div className="flex items-center justify-between">
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-bold text-navy-950"
                  >
                    My Account Profile
                  </Link>
                  <button
                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                    className="text-xs text-red-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-xs font-bold text-blue-600 py-2 bg-blue-50 rounded-lg"
                >
                  Sign In to Account
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
