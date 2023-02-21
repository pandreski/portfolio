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

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(null);
  const { data } = useSWR('/api/homepage/testimonials', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setTestimonials(data);
  }, [data]);

  return (
    <section className='bg-sky-blue'>
      <div className='container px-5 mx-auto mt-20 md:mt-28 bg-sky-blue pt-10 pb-32 md:py-24'>
        <div className='text-center'>
          {testimonials && <SectionTitle id='testimonials' title={testimonials.sectionTitle[locale]} />}
          <p className='mt-6 md:mt-5'>{testimonials && testimonials.sectionSubtitle[locale]}</p>
          <div className='mt-9 md:mx-auto md:w-10/12 lg:w-1/2'>
            <Splide
              hasTrack={false}
              aria-labelledby='testimonials'
            >
              <SplideTrack>
                {testimonials?.data.map((testimonial) => (
                  <SplideSlide key={uuidv4()}>
                    <Image
                      src={testimonial.image.url}
                      alt={`Profile ${testimonial.name}`}
                      width={testimonial.image.width}
                      height={testimonial.image.height}
                      className='w-24 h-24 object-cover rounded-full mx-auto'
                    />
                    <p className='mt-8 leading-7 italic'>{`"${testimonial.body[locale]}"`}</p>
                    <p className='font-bold mt-6 md:mt-8'>{testimonial.name}</p>
                    <p className='mt-2'>{testimonial.role[locale]}</p>
                  </SplideSlide>
                ))}
              </SplideTrack>

              <Controls />
            </Splide>
          </div>
        </div>
      </div>
    </section>
  ); 
}
