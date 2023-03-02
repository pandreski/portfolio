import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';
import { v4 as uuidv4 } from 'uuid';
import Cta from '@/components/Cta';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import Controls from '@/components/slider/Controls';
import Image from 'next/image';
import Head from 'next/head';

function Skeleton() {
  const textLine = 'h-3 w-full bg-slate-200 rounded';
  return (
    <div className='w-full animate-pulse'>
      <div className='flex flex-col md:flex-row-reverse md:justify-end'>
        <div className='md:w-1/2 md:pl-4 lg:pl-[8.3333%] md:mt-10 lg:mt-16 space-y-6'>
          <div className='h-6 w-1/2 bg-slate-200 rounded'></div>
          <div className='space-y-3 w-8/12'>
            <div className={textLine}></div>
            <div className={textLine}></div>
            <div className={textLine}></div>
          </div>
          <div className='space-y-3'>
            <div className={textLine}></div>
            <div className={textLine}></div>
            <div className={textLine}></div>
            <div className={textLine}></div>
            <div className={textLine}></div>
          </div>
        </div>
        <div className='md:w-1/2 lg:w-5/12 space-y-6'>
          <div className='w-full aspect-[600/382] rounded bg-slate-200'></div>
          <div className='h-12 w-28 mx-auto bg-slate-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  const router = useRouter();
  const slug = router.query.slug;
  const { data, isLoading } = useSWR('/api/projects', fetcher);
  const [project, setProject] = useState(null);
  const [labels, setLabels] = useState(null);
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data || !slug) return;

    setLabels(data.labels);
    const current = data.projects?.find((elem) => elem.slug === slug);

    if (typeof current !== 'undefined') {
      setProject(current);
    } else {
      router.push('/not-found');
    }
  }, [data, slug]);

  return (
    <div className='container mx-auto mt-12 md:mt-16 mb-24 md:mb-32 px-5 top-background'>
      {!isLoading && project ? (
        <>
          <Head>
            <title>{locale === 'fr' ? 'Projet' : 'Project'} - {project.title[locale]}</title>
            <meta name="description" content={project.metaDesc[locale]} />
            <meta property="og:title" content={project.title[locale]} />
            <meta property="og:description" content={project.metaDesc[locale]} />
          </Head>
          
          <div className='flex flex-col md:flex-row-reverse md:justify-end'>
            
            <div className='md:w-1/2 md:pl-4 lg:pl-[8.3333%] md:mt-10 lg:mt-16' data-aos='fade-left'>
              <h1 id='project-title' className='font-serif text-deep-green text-2xl md:text-3xl'>{project.title[locale]}</h1>
              <div className='mt-7 md:mt-9'>
                {project.clientName ? (
                  <p className='mt-2'>{labels.clientName[locale]}: {project.clientName[locale]}</p>
                ) : null}
                {project.author ? (
                  <p className='mt-2'>{labels.author[locale]}: {project.author}</p>
                ) : null}
                {project.work ? (
                  <p className='mt-2'>{labels.work[locale]}: {project.work[locale]}</p>
                ) : null}
              </div>
              <p className='mt-7 lg:mt-10 whitespace-pre-line'>{project.description[locale]}</p>
              <div className='mt-7 lg:mt-10'>
                {project.tags?.map((tag) => <Tag key={uuidv4()} label={tag} />)}
              </div>
            </div>

            <div className='mt-9 md:mt-0 md:w-1/2 lg:w-5/12' data-aos='fade-right'>
              <div>
                <Splide
                  hasTrack={false}
                  aria-labelledby='project-title'
                  options={{
                    type: 'loop'
                  }}
                >
                  <SplideTrack>
                    {project.images.map((image) => (
                      <SplideSlide key={uuidv4()}>
                        <div className='relative w-full aspect-[600/382] rounded-lg overflow-hidden'>
                          <Image src={image.url} alt={image.description[locale]} width='600' height='382' className='w-full h-full object-cover' />
                        </div>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                  <Controls />
                </Splide>
              </div>
              <div className='text-center mt-8'>
                {project.website ? (
                  <Cta href={project.website} target='_blank' rel='noopener noreferrer'>{labels.website[locale]}</Cta>
                ) : null}
              </div>
            </div>

          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
