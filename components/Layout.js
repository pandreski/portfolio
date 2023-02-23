import Head from 'next/head';
import { Open_Sans, DM_Serif_Display } from '@next/font/google'
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

const openSans = Open_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-open-sans'
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-dm-serif-display'
})

function Layout({ children }) {
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const nextLocale = locale === 'fr' ? 'en' : 'fr';
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const alternativeUrl = nextLocale !== 'fr' ? `${origin}/${nextLocale}${router.asPath}` : `${origin}${router.asPath}`;
  const ogImageName = {
    fr: "og-image.jpg",
    en: "og-image-en.jpg"
  }
  
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${origin}${router.asPath}`} />
        {origin.length && <meta property="og:image" content={`${origin}/media/${ogImageName[locale]}`} />}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#3FE198" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" hreflang={nextLocale} href={alternativeUrl} />
      </Head>

      <div className={`${openSans.variable} ${dmSerifDisplay.variable} font-sans box-border text-deep-gray relative scroll-smooth pt-20 md:pt-28`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;