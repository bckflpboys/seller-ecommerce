import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-400 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/favi.png" alt="MoonSoft Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <span className="text-2xl font-display font-bold text-blue-400">Moon</span>
                <span className="text-2xl font-display font-bold text-blue-900">Soft</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your trusted source for premium, ultra-soft toilet paper that combines superior comfort with exceptional quality for everyday luxury.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://www.facebook.com/share/1AKpJnpXQk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@soilsolutionsptyltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold text-blue-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-blue-900 mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=toilet-paper" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  Toilet Paper
                </Link>
              </li>
              <li>
                <Link href="/products?category=1-ply-toilet-paper" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  1 Ply Toilet Paper
                </Link>
              </li>
              <li>
                <Link href="/products?category=2-ply-toilet-paper" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                  2 Ply Toilet Paper
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-blue-900 mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>4139 Sehurutsi Street, Kimberley, Northern Cape</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>+27 788 8401</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>sales@moonsoft.life</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-400">
              &copy; {new Date().getFullYear()} MoonSoft. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 justify-center md:justify-end">
              <Link href="/privacy" className="text-blue-400 hover:text-blue-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-400 hover:text-blue-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-blue-400 hover:text-blue-500 transition-colors">
                Refund Policy
              </Link>
              <Link href="/shipping-policy" className="text-blue-400 hover:text-blue-500 transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
