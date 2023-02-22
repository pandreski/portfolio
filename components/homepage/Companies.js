import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import illustration from '@/public/media/co-workers.svg';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import Controls from '@/components/slider/Controls';

export default function Companies() {
  const { data } = useSWR('/api/homepage/companies', fetcher);
  const [companies, setCompanies] = useState(null);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setCompanies(data);
  }, [data]);

  return (
    <section className='overflow-hidden'>
      <div className='container px-5 mx-auto mt-20 md:mt-28 relative'>
        <div className='text-center'>
          {companies && <SectionTitle id='companies' title={companies.sectionTitle[locale]} />}
        </div>
        <div className='mt-14 md:mt-20'>
          <Splide
            hasTrack={false}
            aria-labelledby='companies'
            options={{
              mediaQuery: 'min',
              breakpoints: {
                768: {
                  destroy: true,
                  arrows: false,
                  pagination: false
                }
              }
            }}
          >
            <SplideTrack>
              {companies?.data.map((company) => (
                <SplideSlide key={uuidv4()} className='md:flex items-start md:!mt-12 md:first:!mt-0'>
                  <div className='shrink-0 md:w-3/12 lg:ml-[8.3333%]'>
                    <Image
                      src={company.logo.url}
                      alt={`Logo ${company.name}`}
                      width={company.logo.width}
                      height={company.logo.height}
                      className='w-48 lg:w-60 h-auto mx-auto md:mx-0'
                    />
                  </div>
                  <div className='mt-7 md:mt-0 md:pl-5 lg:w-5/12'>
                    <h3 className='font-serif text-deep-green text-2xl'>{company.name}</h3>
                    <p className='mt-2'>{company.location}</p>
                    <p>{company.duration[locale]}</p>
                    <p className='mt-6'>{company.description[locale]}</p>
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
            <Controls />
          </Splide>
        </div>
        <Image
          src={illustration}
          alt=''
          className='hidden lg:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-52'
        />
      </div>
    </section>
  );
}
