import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - MoonSoft</title>
        <meta name="description" content="MoonSoft Privacy Policy - Learn how we protect and handle your personal information." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: 26 March 2026</p>

          <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
            <p className="text-lg">
              MoonSoft respects your privacy and is committed to protecting your personal information.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and surname</li>
                <li>Contact number and email address</li>
                <li>Delivery address</li>
                <li>Payment-related information (processed securely via third-party providers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and deliver orders</li>
                <li>To communicate order updates</li>
                <li>To improve customer experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Data Protection</h2>
              <p>We do not sell or share your personal information with third parties, except where necessary to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process payments</li>
                <li>Deliver orders</li>
              </ul>
              <p className="mt-4">All data is handled in accordance with applicable South African privacy laws.</p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Information</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">MoonSoft Customer Support</p>
                <p className="text-gray-700">📧 Email: <a href="mailto:sales@moonsoft.life" className="text-blue-600 hover:text-blue-800">sales@moonsoft.life</a></p>
                <p className="text-gray-700">📱 Phone: <a href="tel:0707888401" className="text-blue-600 hover:text-blue-800">070 788 8401</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
