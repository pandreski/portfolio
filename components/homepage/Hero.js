import Image from 'next/image';
import profilePicture from '@/public/media/profil-pierre-andreski.jpg';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';

function Hero() {
  const [heroData, setHeroData] = useState(null);
  const { data } = useSWR('/api/homepage/hero', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setHeroData(data);
  }, [data]);

  return (
    <>
      {heroData ? (
        <section className='container px-5 pt-20 pb-60 md:pt-28 md:pb-64 mx-auto flex flex-col items-center text-center'>
          <h1 className='sr-only'>{heroData.seoTitle[locale]}</h1>
          <SectionTitle title={heroData.title[locale]} />
          <h3 className='md:text-xl mt-7 md:mt-5'>{heroData.subtitle[locale]}</h3>
          <Image src={profilePicture} alt={heroData.imageAlt[locale]} priority title='Pierre Andreski' className='rounded-full w-40 md:w-56 mt-10' />
        </section>
      ) : null}
    </>
  );
}

export default Hero;