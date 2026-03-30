import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service - MoonSoft</title>
        <meta name="description" content="MoonSoft Terms of Service - Read our terms and conditions for purchasing products." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: 26 March 2026</p>

          <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
            <p className="text-lg">
              By accessing or purchasing from MoonSoft, you agree to the following terms:
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Product Availability & Pricing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All products are subject to availability</li>
                <li>Prices are listed in South African Rand (ZAR) and may change without notice</li>
                <li>MoonSoft reserves the right to refuse or cancel orders in cases of suspected fraud or stock limitations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Customer Responsibilities</h2>
              <p>Customers agree to provide accurate billing, shipping, and contact information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Limitation of Liability</h2>
              <p>MoonSoft is not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery delays caused by third-party couriers</li>
                <li>Damages resulting from misuse of products</li>
              </ul>
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
