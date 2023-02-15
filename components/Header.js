import Image from 'next/image';
import logo from '@/public/logo.svg';
import Link from 'next/link';
import frFlag from '@/public/fr.svg';
import gbFlag from '@/public/gb.svg';
import Cta from './Cta';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data } = useSWR('/api/global', fetcher);
  const [ctaLabel, setCtaLabel] = useState(null);
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

  return (
    <header className='container mx-auto px-5'>
      <div className='flex justify-between py-5'>
        <Link href='/'>
          <Image src={logo} alt='Logo' className='w-8 md:w-11' />
        </Link>
        <div className='flex items-center'>
          <div className='mr-4 md:mr-8 cursor-pointer' onClick={() => router.push({ pathname, query }, asPath, { locale: nextLocale })}>
            <Image src={flags[nextLocale]} alt='' title={title[nextLocale]} className='rounded-full w-6' />
          </div>
          {ctaLabel && <Cta href='/'>{ctaLabel[locale]}</Cta>}
        </div>
      </div>
    </header>
  );
}
