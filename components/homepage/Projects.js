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

export default function Projects() {
  const { data } = useSWR('/api/homepage/projects', fetcher);
  const { data: projectsData } = useSWR('/api/projects', fetcher);
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
        {title && <SectionTitle id='projects' title={title[locale]} />}
      </div>

      <Splide
        hasTrack={false}
        aria-labelledby='projects'
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
        className='mt-8 md:mt-20'
      >
        <SplideTrack className='slider-grid'>
          {projects?.map((project) => (
            <SplideSlide key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <ProjectCard image={project.cover} title={project.title[locale]} />
              </Link>
            </SplideSlide>
          ))}
        </SplideTrack>
        <Controls />
      </Splide>
    </section>
  );
}
