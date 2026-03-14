import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favi.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favi.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favi.png" />
        <link rel="apple-touch-icon" href="/favi.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favi.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favi.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
