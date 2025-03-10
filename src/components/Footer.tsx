import { Leaf, Mail, Phone, MapPin, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-earth" />
              <div>
                <span className="text-2xl font-display font-bold text-earth">Eco</span>
                <span className="text-2xl font-display font-bold text-sage">Store</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your trusted source for natural products, eco-friendly cleaning solutions, and sustainable food items.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://www.facebook.com/share/1AKpJnpXQk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-earth hover:text-earth-dark transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@soilsolutionsptyltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-earth hover:text-earth-dark transition-colors duration-200"
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
            <h3 className="text-lg font-display font-bold text-earth-dark mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-earth-dark mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=muthi-products" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Muthi Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=poultry-products" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Poultry Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=livestock" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Livestock
                </Link>
              </li>
              <li>
                <Link href="/products?category=cleaning-products" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Cleaning Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=sanitary-products" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Sanitary Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=vegetables" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Vegetables
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-earth-dark mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-earth flex-shrink-0" />
                <span>4139 Sehurutsi Street, Kimberley, Northern Cape</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-earth flex-shrink-0" />
                <span>+27 67 152 0479</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-earth flex-shrink-0" />
                <span>soilsolutionsptyltd@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} EcoStore. All rights reserved.
            </p>
            <div className="flex space-x-6 md:justify-end text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-earth transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-earth transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
