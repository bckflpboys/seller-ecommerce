import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function RefundPolicy() {
  return (
    <Layout>
      <Head>
        <title>Refund & Return Policy - MoonSoft</title>
        <meta name="description" content="MoonSoft Refund & Return Policy - Learn about our return and refund procedures." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Refund & Return Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: 26 March 2026</p>

          <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
            <p className="text-lg">
              Due to the hygienic nature of toilet paper products, we have specific return and refund guidelines.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Returns Are Accepted Only If:</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The item is damaged, defective, or incorrect</li>
                <li>The product is unopened and in original packaging</li>
                <li>The request is made within 48 hours of delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Non-Returnable Items</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opened or used products</li>
                <li>Incorrect orders placed by the customer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-900 mt-8 mb-4">Resolution Options</h2>
              <p>For eligible returns, we offer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Replacement product, or</li>
                <li>Full/partial refund (processed within 3–7 business days)</li>
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
