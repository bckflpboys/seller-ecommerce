import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nunito, Quicksand } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <main className={`${nunito.variable} ${quicksand.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-right" />
        </main>
      </CartProvider>
    </SessionProvider>
  );
}
