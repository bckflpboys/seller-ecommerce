import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </Head>
        <main className={`${nunito.variable} ${quicksand.variable} font-sans w-full max-w-full overflow-x-hidden`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-right" />
        </main>
      </CartProvider>
    </SessionProvider>
  );
}
