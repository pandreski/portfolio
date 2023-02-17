import Image from 'next/image';
import profilePicture from '@/public/media/profil-pierre-andreski.jpg';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';

function Hero() {
  const [seoTitle, setSeoTitle] = useState(null);
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const { data, isLoading } = useSWR('/api/homepage/hero', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setSeoTitle(data.seoTitle);
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setImageAlt(data.imageAlt);
  }, [data]);

  // TODO: add loading skeleton
  if (isLoading) {
    return (
      <p>LOADING</p>
    )
  }

  return (
    <section className='container px-5 pt-20 pb-60 md:pt-28 md:pb-64 mx-auto flex flex-col items-center text-center'>
      <h1 className='sr-only'>{seoTitle ? seoTitle[locale] : ''}</h1>
      {title && <SectionTitle title={title[locale]} />}
      <h3 className='md:text-xl mt-7 md:mt-5'>{subtitle ? subtitle[locale] : ''}</h3>
      <Image src={profilePicture} alt={imageAlt ? imageAlt[locale] : ''} title='Pierre Andreski' className='rounded-full w-40 md:w-56 mt-10' />
    </section>
  );
}

export default Hero;