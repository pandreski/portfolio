import Image from 'next/image';
import developerPicture from '@/public/media/developer.svg';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Introduction() {
  const { data } = useSWR('/api/homepage/introduction', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  useEffect(() => {
    if (!data) return;
    setTitle(data.title);
    setBody(data.body);
  }, [data]);

  return (
    <section className='bg-sky-blue'>
      <div className='container mx-auto md:w-10/12 lg:w-7/12 px-5 pt-20 pb-44 lg:pt-28 lg:pb-80 text-center relative'>
        <Image src={developerPicture} alt='' className='absolute left-5 md:left-0 bottom-full md:translate-x-0 translate-y-11 md:translate-y-16 max-w-[235px] md:max-w-[345px]' />
        <h2 className='font-serif text-deep-green text-2xl md:text-3xl'>{title && title[locale]}</h2>
        <p className='mt-8 md:mt-20 whitespace-pre-line'>
          {body && body[locale]}
        </p>
      </div>
    </section>
  );
}

export default Introduction;