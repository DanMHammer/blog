import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeContextProvider } from "../components/context/ThemeContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>Dan Hammer</title>
      </Head>
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}
