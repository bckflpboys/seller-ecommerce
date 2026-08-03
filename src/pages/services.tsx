import Image from 'next/image';
import { Sparkles, Building2, Home, Shirt, SprayCan, Droplets, PackageCheck } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: 'Contract Cleaning',
      description: 'Professional contract cleaning services for businesses and organizations. We provide reliable, consistent cleaning solutions tailored to your specific needs and schedules.',
      features: ['Regular scheduled cleaning', 'Customized service plans', 'Quality assurance checks', 'Trained cleaning staff']
    },
    {
      icon: Sparkles,
      title: 'Deep Cleaning & Sanitisation',
      description: 'Thorough deep cleaning and sanitisation services that go beyond surface cleaning. Perfect for periodic maintenance or preparing your space for special events.',
      features: ['Complete sanitisation', 'Hard-to-reach areas', 'Professional equipment', 'Health & safety compliant']
    },
    {
      icon: Home,
      title: 'Post-Construction Cleaning',
      description: 'Specialized cleaning services for newly constructed or renovated properties. We remove construction debris, dust, and residue to make your space move-in ready.',
      features: ['Debris removal', 'Dust & residue elimination', 'Window & surface cleaning', 'Final polish & inspection']
    },
    {
      icon: Shirt,
      title: 'Carpet & Upholstery Cleaning',
      description: 'Expert carpet and upholstery cleaning using advanced techniques and eco-friendly products. We restore freshness and extend the life of your furnishings.',
      features: ['Deep stain removal', 'Odor elimination', 'Fabric protection', 'Fast drying methods']
    },
    {
      icon: SprayCan,
      title: 'Window Cleaning',
      description: 'Crystal-clear window cleaning services for residential and commercial properties. We ensure streak-free, spotless windows that let the light shine through.',
      features: ['Interior & exterior cleaning', 'High-rise capabilities', 'Streak-free results', 'Frame & sill cleaning']
    },
    {
      icon: Droplets,
      title: 'Supply of Professional Cleaning Chemicals',
      description: 'High-quality professional cleaning chemicals and products from our MoonSoft range. Reliable supplies for all your cleaning needs.',
      features: ['Premium MoonSoft products', 'Bulk ordering available', 'Eco-friendly options', 'Expert product guidance']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-blue-50/50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blue-bg.jpeg"
            alt="Background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-blue-900">
              Professional Cleaning Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive cleaning solutions for businesses, healthcare facilities, schools, retail outlets, hospitality, and residential customers across Kimberley and the Northern Cape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <PackageCheck className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blue-bg.jpeg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-4xl font-display font-bold text-blue-900 text-center mb-8">
              Who We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Corporate Offices', icon: Building2 },
                { title: 'Schools & Education', icon: Sparkles },
                { title: 'Healthcare Facilities', icon: Droplets },
                { title: 'Retail Outlets', icon: PackageCheck },
                { title: 'Hospitality Establishments', icon: Home },
                { title: 'Residential Customers', icon: Shirt }
              ].map((market, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <market.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <span className="text-gray-800 font-semibold">{market.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-blue-900 text-center mb-12">
            Why Choose MoonSoft Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Advantage</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Strong local knowledge of the Kimberley and Northern Cape market</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Competitive, transparent pricing with no hidden costs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Flexible service agreements tailored to client needs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Quality, reliable cleaning products from our own MoonSoft range</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Promise</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Responsive and personalized customer service</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Customized cleaning solutions for each client sector</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Trained, professional cleaning staff</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Consistent quality and reliability you can depend on</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blue-bg.jpeg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Ready to Experience Professional Cleaning?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contact us today for a customized quote and discover the MoonSoft difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
              >
                Get a Quote
              </Link>
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg border-2 border-blue-600"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
