import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as ga from '@/utils/ga';
import Script from 'next/script';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <Layout>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} strategy='afterInteractive' />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
    </Layout>
  )
}
