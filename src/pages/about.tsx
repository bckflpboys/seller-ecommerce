import Image from 'next/image';
import { Leaf, Sprout, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Eco-friendly farming"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold">
              Nurturing Earth, Growing Future
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Committed to sustainable agriculture and eco-friendly solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-bold text-earth-dark">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At EcoStore, we believe in harmonizing agriculture with nature. Our mission is to provide sustainable, eco-friendly solutions that enhance soil health while protecting our environment for future generations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work directly with farmers and environmental experts to develop products that not only improve crop yields but also maintain the delicate balance of our ecosystem.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mission.jpg"
                alt="Sustainable farming practices"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-earth-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-earth-dark text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'We prioritize environmental sustainability in every product and practice.'
              },
              {
                icon: Sprout,
                title: 'Innovation',
                description: 'Constantly developing new solutions for better agricultural practices.'
              },
              {
                icon: Heart,
                title: 'Community',
                description: 'Supporting farmers and local communities for collective growth.'
              },
              {
                icon: ShieldCheck,
                title: 'Quality',
                description: 'Ensuring the highest standards in all our products and services.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-warm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-bold text-earth-dark mb-2">
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

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-earth-dark text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Founder & CEO',
                image: '/images/team/sarah.jpg'
              },
              {
                name: 'Michael Chen',
                role: 'Agricultural Scientist',
                image: '/images/team/michael.jpg'
              },
              {
                name: 'Emma Williams',
                role: 'Sustainability Director',
                image: '/images/team/emma.jpg'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-warm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-earth-dark">
                    {member.name}
                  </h3>
                  <p className="text-sage">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
