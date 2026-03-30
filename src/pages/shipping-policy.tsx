import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function ShippingPolicy() {
  return (
    <Layout>
      <Head>
        <title>Shipping Policy - MoonSoft</title>
        <meta name="description" content="MoonSoft Shipping Policy - Learn about our delivery areas, timeframes, and shipping costs." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Shipping Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: 26 March 2026</p>

          <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Delivery Areas & Timeframes</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-blue-900">Kimberley</p>
                    <p className="text-gray-700">1–3 business days</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Outside Kimberley</p>
                    <p className="text-gray-700">3–5 business days</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Customers within Kimberley can expect delivery within 1–3 business days. Orders outside the region are delivered within 3–5 business days, depending on location and order size.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Shipping Costs</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Flat rate applies within Kimberley</li>
                <li>Bulk delivery fees apply for outlying areas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Additional Notes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery times may vary due to external factors</li>
                <li>Customers will be notified of any delays</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Stock & Fulfilment</h2>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="font-semibold text-green-900 mb-2">MoonSoft maintains physical stock of all listed products.</p>
                <p className="text-gray-700 mb-2">This is not a dropshipping business.</p>
                <p className="text-gray-700">Inventory is:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Purchased in bulk from verified suppliers</li>
                  <li>Stored and distributed from Kimberley, South Africa</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">Proof of stock and purchase documentation is available upon request.</p>
              </div>
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
