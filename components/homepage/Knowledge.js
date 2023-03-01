import { useEffect, useState } from 'react';
import Card from '../Card';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { Parallax } from 'react-scroll-parallax';
import { useMediaQuery } from 'react-responsive';

function Skeleton() {
  return (
    <>
      <div className='w-full h-96 bg-slate-100 rounded animate-pulse'></div>
      <div className='w-full h-96 bg-slate-100 rounded animate-pulse'></div>
      <div className='w-full h-96 bg-slate-100 rounded animate-pulse'></div>
    </>
  );
}

export default function Knowledge() {
  const [knowledge, setKnowledge] = useState(null);
  const { data, isLoading } = useSWR('/api/homepage/knowledge', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const order = [
    'md:order-2',
    'md:order-1 md:mt-16',
    'md:order-3 md:mt-32',
  ];

  const parallaxSpeed = [10, 20, 30];

  useEffect(() => {
    if (!data) return;
    setKnowledge(data);
  }, [data]);

  return (
    <section className='container mx-auto px-5 -mt-24 lg:-mt-52 grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-y-0 md:gap-x-4 lg:gap-x-6 items-start relative z-[1]'>
      {!isLoading && knowledge ? (
        knowledge.map((elem, i) => (
          <Parallax key={uuidv4()} className={`${order[i]}`} disabled={isMobile} speed={parallaxSpeed[i]}>
            <Card title={elem.title[locale]} subtitle={elem.subtitle[locale]} list={elem.items[locale]} desktopOrder={elem.desktopOrder} />
          </Parallax>
        ))
      ) : (
        <Skeleton />
      )}
    </section>
  );
}
