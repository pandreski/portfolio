import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import IconButton from './IconButton';
import Image from 'next/image';
import logo from '@/public/media/logo-monochrome.svg';

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const { data } = useSWR('/api/global', fetcher);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setFooterData(data.footer);
  }, [data]);

  return (
    <>
      {footerData && (
        <footer className='bg-primary'>
          <div className='container mx-auto px-5 pb-10 md:pb-16'>
            <section
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='bg-deep-green text-white md:flex justify-between items-center rounded-lg w-10/12 mx-auto -translate-y-14 md:-translate-y-10 px-4 md:px-12 lg:px-20 py-6 md:py-11'>
                <div className='font-serif text-center md:text-left text-2xl lg:text-[26px]'>
                  {footerData.banner.title[locale]}
                </div>
                <div className='text-center my-5 md:my-0 md:px-6 xl:px-4 xl:w-2/5 whitespace-pre-line'>
                  {footerData.banner.body[locale]}
                </div>
                <div className='shrink-0 flex justify-center items-center'>
                  <IconButton
                    href='https://www.linkedin.com/in/pierreandreski/'
                    target='_blank'
                    theme='light'
                    icon='linkedin'
                  />
                </div>
              </div>
            </section>

            <section className='text-center mt-5'>
              <Image
                src={logo}
                alt=''
                className='mx-auto'
                data-aos='fade-up'
              />
              <div className='mt-12' data-aos='zoom-in' data-aos-delay='400'>
                <IconButton
                  href='https://www.linkedin.com/in/pierreandreski/'
                  target='_blank'
                  icon='linkedin'
                  extraClass='ml-6 first:ml-0'
                />
                <IconButton
                  href='https://github.com/pandreski'
                  target='_blank'
                  icon='github'
                  extraClass='ml-6 first:ml-0'
                />
              </div>
              <p className='mt-12'>© {new Date().getFullYear()} Pierre Andreski</p>
            </section>
          </div>
        </footer>
      )}
    </>
  );
}
