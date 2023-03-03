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
  const locale = router.locale ? router.locale : router.defaultLocale;

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
      <Script id='axeptio-manager' strategy='afterInteractive'>
        {`
          function loadGoogleAnalyticsTag() {
            var el = document.createElement('script');
            el.setAttribute('type', 'text/javascript');
            el.setAttribute('async', true);
            el.setAttribute('src', '//www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            document.body.append(el);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          }

          window.axeptioSettings = {
            clientId: "${process.env.NEXT_PUBLIC_AXEPTIO_ID}",
            cookiesVersion: "${locale === 'fr' ? process.env.NEXT_PUBLIC_AXEPTIO_PROJECT_FR : process.env.NEXT_PUBLIC_AXEPTIO_PROJECT_EN}",
          };
            
          (function(d, s) {
            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
            e.async = true; e.src = "//static.axept.io/sdk.js";
            t.parentNode.insertBefore(e, t);
          })(document, "script");

          void 0 === window._axcb && (window._axcb = []);
          window._axcb.push(function (axeptio) {
            axeptio.on("cookies:complete", function (choices) {
              if (choices.google_analytics) {
                loadGoogleAnalyticsTag();
              }
            });
          });

          (_axcb = window._axcb || []).push(function(sdk) {
            sdk.on('consent:saved', function(choices) { 
                window.location.reload()
            });
          });
        `}
      </Script>
      <Component {...pageProps} />
    </Layout>
  )
}
