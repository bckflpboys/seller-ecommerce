import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have about our products and services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-blue-300">
                <h2 className="text-3xl font-display font-bold text-blue-900 mb-6">
                  Our Information
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: 'Visit Us',
                      content: '4139 Sehurutsi Street, Kimberley, Northern Cape'
                    },
                    {
                      icon: Phone,
                      title: 'Call Us',
                      content: '+27 67 152 0479'
                    },
                    {
                      icon: Mail,
                      title: 'Email Us',
                      content: 'soilsolutionsptyltd@gmail.com'
                    },
                    {
                      icon: Clock,
                      title: 'Business Hours',
                      content: 'Mon - Fri: 8:00 AM - 5:00 PM'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-blue-200 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-300">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-blue-800">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-blue-300">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Our Location</h3>
                <div className="relative h-[300px] rounded-lg overflow-hidden border-2 border-blue-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.744772826592!2d24.75!3d-28.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b0dd60e75d84d%3A0x7c0b7a3d12345678!2s4139%20Sehurutsi%20Street%2C%20Kimberley%2C%20Northern%20Cape!5e0!3m2!1sen!2sza!4v1678451234567!5m2!1sen!2sza"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="Soil Solutions Location Map"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-blue-300">
              <h2 className="text-3xl font-bold text-blue-900 mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border border-blue-200 rounded-lg">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-blue-900 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="p-4 border border-blue-200 rounded-lg">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-900 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="p-4 border border-blue-200 rounded-lg">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-blue-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="p-4 border border-blue-200 rounded-lg">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 border-2 border-blue-700"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
