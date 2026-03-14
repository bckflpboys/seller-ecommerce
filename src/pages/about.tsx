import Image from 'next/image';
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold text-blue-900">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At MoonSoft, we believe everyone deserves the luxury of premium toilet paper. Our mission is to provide the softest, most absorbent, and strongest toilet paper that transforms your daily routine into a moment of comfort and care.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We use advanced manufacturing techniques and carefully selected materials to create toilet paper that's gentle on your skin while being tough enough for everyday use. Every roll is crafted with attention to detail and quality.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/heroo.jpeg"
                alt="Premium toilet paper manufacturing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
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
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
