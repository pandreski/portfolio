import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';
import ProjectCard from '../ProjectCard';
import Link from 'next/link';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import Controls from '@/components/slider/Controls';

function Skeleton() {
  return (
    <div className='w-full animate-pulse'>
      <div className='h-6 w-1/2 mx-auto bg-slate-100 rounded'></div>
    </div>
  );
}

function ProjectSkeleton() {
  const cardClass = 'w-full aspect-[600/382] rounded bg-slate-100';
  return (
    <div className='mt-8 md:mt-20 md:!grid md:grid-cols-2 lg:grid-cols-3 md:gap-7 animate-pulse'>
      <div className={cardClass}></div>
      <div className={`${cardClass} hidden md:block`}></div>
      <div className={`${cardClass} hidden md:block`}></div>
      <div className={`${cardClass} hidden md:block`}></div>
      <div className={`${cardClass} hidden md:block`}></div>
      <div className={`${cardClass} hidden md:block`}></div>
    </div>
  );
}

export default function Projects() {
  const { data, isLoading } = useSWR('/api/homepage/projects', fetcher);
  const { data: projectsData, isLoading: projectsLoading } = useSWR('/api/projects', fetcher);
  const [title, setTitle] = useState(null);
  const [projects, setProjects] = useState(null);
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;

  useEffect(() => {
    if (!data) return;
    setTitle(data.title);
  }, [data]);

  useEffect(() => {
    if (!projectsData) return;
    setProjects(projectsData.projects);
  }, [projectsData]);

  return (
    <section className='container px-5 mx-auto mt-20 md:mt-28'>
      <div className='text-center'>
        {!isLoading && title ? (
          <SectionTitle id='projects' title={title[locale]} data-aos='fade-up' />
        ) : (
          <Skeleton />
        )}
      </div>

      {!projectsLoading && projects ? (
        <Splide
          hasTrack={false}
          aria-labelledby='projects'
          options={{
            type: 'loop',
            mediaQuery: 'min',
            breakpoints: {
              768: {
                destroy: true,
                arrows: false,
                pagination: false
              }
            }
          }}
          className='mt-8 md:mt-20'
        >
          <SplideTrack className='slider-grid'>
            {projects?.map((project, i) => (
              <SplideSlide key={project.slug} data-aos='fade-up' data-aos-delay={i * 50}>
                <Link href={`/projects/${project.slug}`}>
                  <ProjectCard image={project.cover} title={project.title[locale]} />
                </Link>
              </SplideSlide>
            ))}
          </SplideTrack>
          <Controls />
        </Splide>
      ) : (
        <ProjectSkeleton />
      )}
    </section>
  );
}
