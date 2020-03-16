import Footer from "@components/footer";
import Navigation from "@components/navigation";
import getLibrary from "@lib/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import "../css/tailwind.css";
import Head from "next/head";

export default function UnionApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <link
          rel="preload"
          href="/Montserrat-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Montserrat-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Montserrat-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <header>
        <Navigation />
      </header>

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </Web3ReactProvider>
  );
}
