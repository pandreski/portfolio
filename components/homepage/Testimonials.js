import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';
import Image from 'next/image';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import Controls from '../slider/Controls';

function Skeleton() {
  const textLine = 'h-3 w-full bg-slate-200 rounded';
  return (
    <div className='w-full flex flex-col items-center animate-pulse space-y-6'>
      <div className='h-6 w-1/2 bg-slate-200 rounded'></div>
      <div className='h-4 w-1/2 bg-slate-200 rounded'></div>
      <div className='w-full md:w-10/12 lg:w-1/2 space-y-6'>
        <div className='w-24 h-24 bg-slate-200 rounded-full mx-auto'></div>
        <div className='space-y-3'>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
        <div className='space-y-3 w-8/12 mx-auto'>
          <div className={textLine}></div>
          <div className={textLine}></div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(null);
  const { data, isLoading } = useSWR('/api/homepage/testimonials', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setTestimonials(data);
  }, [data]);

  return (
    <section className='bg-sky-blue'>
      <div className='container px-5 mx-auto mt-20 md:mt-28 bg-sky-blue pt-10 pb-32 md:py-24'>
        {!isLoading && testimonials ? (
          <div className='text-center'>
            <SectionTitle id='testimonials' title={testimonials.sectionTitle[locale]} data-aos='fade-up' />
            <p className='mt-6 md:mt-5' data-aos='fade-up' data-aos-delay='200'>{testimonials.sectionSubtitle[locale]}</p>
            <div className='mt-9 md:mx-auto md:w-10/12 lg:w-1/2' data-aos='fade-up' data-aos-delay='300'>
              <Splide
                hasTrack={false}
                aria-labelledby='testimonials'
                options={{
                  type: 'loop'
                }}
              >
                <SplideTrack>
                  {testimonials.data.map((testimonial) => (
                    <SplideSlide key={uuidv4()}>
                      <Image
                        src={testimonial.image.url}
                        alt={`Profile ${testimonial.name}`}
                        width={testimonial.image.width}
                        height={testimonial.image.height}
                        className='w-24 h-24 object-cover rounded-full mx-auto'
                      />
                      <p className='mt-8 leading-7 italic whitespace-pre-line'>{`"${testimonial.body[locale]}"`}</p>
                      <p className='font-bold mt-6 md:mt-8'>{testimonial.name}</p>
                      <p className='mt-2'>{testimonial.role[locale]}</p>
                    </SplideSlide>
                  ))}
                </SplideTrack>

                <Controls />
              </Splide>
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </section>
  ); 
}
