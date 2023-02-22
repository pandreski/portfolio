import Cta from '@/components/Cta';
import Image from 'next/image';
import error from '@/public/media/error.svg';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';

export default function Error404() {
  const [labels, setLabels] = useState(null);
  const { data } = useSWR('/api/global', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setLabels(data.error);
  }, [data]);

  return (
    <>
      {labels && (
        <>
          <Head>
            <title>{labels.title[locale]}</title>
          </Head>
          <div className='container mx-auto mt-12 md:mt-16 mb-40 md:mb-56 px-5 top-background'>
            <div className='flex flex-col items-center'>
              <Image src={error} alt='' className='w-28 h-auto' />
              <p className='font-serif text-3xl md:text-4xl mt-10'>{labels.title[locale]}</p>
              <span className='mt-10'>
                <Cta href='/'>{labels.buttonLabel[locale]}</Cta>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
