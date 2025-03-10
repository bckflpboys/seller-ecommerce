import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Playfair_Display } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <main className={`${inter.variable} ${playfair.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-right" />
        </main>
      </CartProvider>
    </SessionProvider>
  );
}
