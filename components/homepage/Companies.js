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
import PropTypes from 'prop-types';
import { Parallax } from 'react-scroll-parallax';
import { useMediaQuery } from 'react-responsive';

function ItemSkeleton({ isHiddenMobile }) {
  const textLine = 'h-3 w-full bg-slate-100 rounded';
  const hiddenMobile = 'hidden md:block';

  return (
    <div className={`md:flex space-y-4 md:space-y-0 md:space-x-4 ${isHiddenMobile ? hiddenMobile : ''}`}>
      <div className='w-full md:w-4/12 h-20 bg-slate-100 rounded'></div>
      <div className='w-full md:w-8/12 space-y-4'>
        <div className='h-5 w-28 bg-slate-100 rounded'></div>
        <div className='space-y-3 w-1/2'>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
        <div className='space-y-3 w-full lg:w-8/12'>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className='w-full flex flex-col items-center animate-pulse'>
      <div className='h-6 w-1/2 bg-slate-100 rounded'></div>
      <div className='w-full lg:w-10/12 mt-14 md:mt-20 space-y-24'>
        <ItemSkeleton />
        <ItemSkeleton isHiddenMobile={true} />
        <ItemSkeleton isHiddenMobile={true} />
      </div>
    </div>
  );
}

export default function Companies() {
  const { data, isLoading } = useSWR('/api/homepage/companies', fetcher);
  const [companies, setCompanies] = useState(null);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    if (!data) return;
    setCompanies(data);
  }, [data]);

  return (
    <section className='overflow-hidden'>
      <div className='container px-5 mx-auto mt-20 md:mt-28 relative'>
        {!isLoading && companies ? (
          <>
            <div className='text-center'>
              <SectionTitle id='companies' title={companies.sectionTitle[locale]} data-aos='fade-up' />
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
                  {companies?.data.map((company, i) => (
                    <SplideSlide key={uuidv4()} className='md:flex items-start md:!mt-12 md:first:!mt-0' data-aos='fade-up' data-aos-delay={i * 100}>
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
          </>
        ) : (
          <Skeleton />
        )}

        <div className='hidden lg:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-52 w-[514px] h-[434px] -z-[1]'>
          <Parallax translateX={['0px', '-100px']} disabled={!isLaptop}>
            <Image
              src={illustration}
              alt=''
              className=''
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

ItemSkeleton.propTypes = {
  isHiddenMobile: PropTypes.bool
}

ItemSkeleton.defaultProps = {
  isHiddenMobile: false
}
