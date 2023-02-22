import Head from 'next/head';
import { Open_Sans, DM_Serif_Display } from '@next/font/google'
import Header from './Header';
import Footer from './Footer';

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
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#3FE198" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${openSans.variable} ${dmSerifDisplay.variable} font-sans box-border text-deep-gray relative scroll-smooth`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;