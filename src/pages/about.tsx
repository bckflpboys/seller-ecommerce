import Image from 'next/image';
import Link from 'next/link';
import { Package, Sparkles, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-blue-50/50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src="/about-email.jpeg"
            alt="Premium toilet paper quality"
            fill
            className="object-contain bg-gradient-to-br from-blue-100 to-blue-200"
            priority
          />
        </div>
        {/* Text content moved below image */}
        <div className="bg-gradient-to-br from-yellow-50/50 via-white to-blue-50/50 py-16">
          <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900">
              Premium Comfort, Everyday Luxury
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Crafting the softest, strongest toilet paper for your ultimate comfort
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blue-bg.jpeg"
            alt="Background"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold text-blue-900">
                Our Mission
              </h2>
              <p className="text-gray-800 leading-relaxed font-medium">
                At MoonSoft, we believe everyone deserves the luxury of premium toilet paper. Our mission is to provide the softest, most absorbent, and strongest toilet paper that transforms your daily routine into a moment of comfort and care.
              </p>
              <p className="text-gray-800 leading-relaxed font-medium">
                We use advanced manufacturing techniques and carefully selected materials to create toilet paper that's gentle on your skin while being tough enough for everyday use. Every roll is crafted with attention to detail and quality.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/heroo.jpeg"
                alt="Premium toilet paper manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blue-bg.jpeg"
            alt="Background"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-display font-bold text-blue-900 text-center mb-16">
            Why Choose MoonSoft
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Package,
                title: 'Premium Quality',
                description: 'Made from the finest materials for superior softness and strength.'
              },
              {
                icon: Sparkles,
                title: 'Ultra Soft',
                description: 'Gentle on your skin with a luxurious feel that you\'ll love.'
              },
              {
                icon: Heart,
                title: 'Family Care',
                description: 'Safe and comfortable for the whole family, from babies to seniors.'
              },
              {
                icon: ShieldCheck,
                title: 'Reliable',
                description: 'Strong and absorbent - you can count on MoonSoft every time.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-blue-900 mb-6">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              MoonSoft is more than just products - we provide comprehensive cleaning solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Contract Cleaning',
                description: 'Reliable, scheduled cleaning services for corporate offices, schools, healthcare facilities, and retail outlets.',
                icon: '🏢'
              },
              {
                title: 'Deep Cleaning & Sanitisation',
                description: 'Thorough deep cleaning that goes beyond surface cleaning, perfect for periodic maintenance and special events.',
                icon: '✨'
              },
              {
                title: 'Post-Construction Cleaning',
                description: 'Specialized cleaning for newly built or renovated properties, making spaces move-in ready.',
                icon: '🏗️'
              },
              {
                title: 'Carpet & Upholstery Cleaning',
                description: 'Expert cleaning using advanced techniques to restore freshness and extend furniture life.',
                icon: '🛋️'
              },
              {
                title: 'Window Cleaning',
                description: 'Professional window cleaning for residential and commercial properties with streak-free results.',
                icon: '🪟'
              },
              {
                title: 'Professional Cleaning Chemicals',
                description: 'High-quality MoonSoft cleaning products and chemicals for all your cleaning needs.',
                icon: '🧴'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Serving Kimberley and the Northern Cape
            </h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We provide customized cleaning solutions for corporate offices, schools, healthcare facilities, retail outlets, hospitality establishments, and residential customers.
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg shadow-lg"
            >
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
