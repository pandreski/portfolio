import Image from 'next/image';
import developerPicture from '@/public/media/developer.svg';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Skeleton() {
  const textLine = 'mx-auto h-3 w-full bg-slate-200 rounded'
  return (
    <div className='flex flex-col items-center animate-pulse'>
      <div className='h-6 w-1/2 bg-slate-200 rounded'></div>
      <div className='w-full space-y-16 md:space-y-10 mt-20'>
        <div className='space-y-3 w-full'>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
        <div className='space-y-3 w-full'>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
        <div className='space-y-3 w-full'>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
      </div>
    </div>
  );
}

export default function Introduction() {
  const { data, isLoading } = useSWR('/api/homepage/introduction', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const [introData, setData] = useState(null);

  useEffect(() => {
    if (!data) return;
    setData(data);
  }, [data]);

  return (
    <section className='bg-sky-blue'>
      <div className='container mx-auto md:w-10/12 lg:w-7/12 px-5 pt-20 pb-44 lg:pt-28 lg:pb-80 text-center relative'>
        <Image src={developerPicture} alt='' priority className='absolute left-5 md:left-0 bottom-full md:translate-x-0 translate-y-11 md:translate-y-16 max-w-[235px] md:max-w-[345px]' />
        {!isLoading && introData ? (
          <>
            <h2 className='font-serif text-deep-green text-2xl md:text-3xl'>{introData.title[locale]}</h2>
            <p className='mt-8 md:mt-20 whitespace-pre-line'>
              {introData.body[locale]}
            </p>
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </section>
  );
}
