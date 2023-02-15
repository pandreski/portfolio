import { useEffect, useState } from 'react';
import Card from '../Card';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export default function Knowledge() {
  const [knowledge, setKnowledge] = useState(null);
  const { data } = useSWR('/api/homepage/knowledge', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setKnowledge(data);
  }, [data]);

  return (
    <section className='container mx-auto px-5 -mt-24 lg:-mt-52 grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-y-0 md:gap-x-4 lg:gap-x-6 items-start relative z-[1]'>
      {knowledge?.map((elem) => <Card key={uuidv4()} title={elem.title[locale]} subtitle={elem.subtitle[locale]} list={elem.items[locale]} desktopOrder={elem.desktopOrder} />)}
    </section>
  );
}
