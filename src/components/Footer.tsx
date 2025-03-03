import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
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
              <a href="#" className="text-earth hover:text-earth-dark transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-earth hover:text-earth-dark transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-earth hover:text-earth-dark transition-colors duration-200">
                <Twitter className="w-5 h-5" />
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
                <Link href="/products/natural" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Natural Products
                </Link>
              </li>
              <li>
                <Link href="/products/cleaning" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Eco Cleaning
                </Link>
              </li>
              <li>
                <Link href="/products/food" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  Sustainable Food
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-gray-600 hover:text-earth transition-colors duration-200">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-earth-dark mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-earth flex-shrink-0" />
                <span>123 Nature Street, Green City, SA</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-earth flex-shrink-0" />
                <span>+27 12 345 6789</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-earth flex-shrink-0" />
                <span>info@ecostore.co.za</span>
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
