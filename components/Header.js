import Image from 'next/image';
import logo from '@/public/media/logo.svg';
import Link from 'next/link';
import frFlag from '@/public/media/fr.svg';
import gbFlag from '@/public/media/gb.svg';
import Cta from './Cta';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data } = useSWR('/api/global', fetcher);
  const [ctaLabel, setCtaLabel] = useState(null);
  const [isScrolled, setScroll] = useState(false);
  const router = useRouter();
  const locale = router.locale;
  const { pathname, asPath, query } = router;
  const flags = {
    fr: frFlag,
    en: gbFlag
  }
  const title = {
    fr: 'Version française',
    en: 'English version'
  }
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  useEffect(() => {
    if (!data) return;
    setCtaLabel(data.header.cta);
  }, [data]);

  useEffect(() => {
    function handleScroll() {
      const offset = (document.body.getBoundingClientRect()).top;

      if (offset !== 0) {
        setScroll(true);
      } else {
        setScroll(false)
      }
    }

    // Update scroll value if the page is loaded and not at the top
    if ((document.body.getBoundingClientRect()).top !== 0) {
      setScroll(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 bg-transparent transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm' : ''}`}>
      <div className='container mx-auto px-5'>
        <div className='flex justify-between py-5'>
          <Link href='/'>
            <Image src={logo} alt='Logo' priority className={`max-w-[30px] md:max-w-[42px] ${isScrolled ? '!max-w-[25px]' : ''} transition-[max-width] duration-300`} />
          </Link>
          <div className='flex items-center'>
            <div className='mr-4 md:mr-8 cursor-pointer' onClick={() => router.push({ pathname, query }, asPath, { locale: nextLocale })}>
              <Image src={flags[nextLocale]} alt='' title={title[nextLocale]} className='rounded-full w-6' />
            </div>
            {ctaLabel && <Cta href='/'>{ctaLabel[locale]}</Cta>}
          </div>
        </div>
      </div>
    </header>
  );
}
