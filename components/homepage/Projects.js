import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionTitle from '../SectionTitle';
import ProjectCard from '../ProjectCard';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

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
    setProjects(projectsData);
  }, [projectsData]);

  return (
    <section className='container px-5 mx-auto mt-20 md:mt-28'>
      <div className='text-center'>
        {title && <SectionTitle title={title[locale]} />}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-8 md:mt-20'>
        {
          projects?.map((project) => (
            <Link href={`/project/${project.slug}`} key={uuidv4()}>
              <ProjectCard image={project.cover} title={project.title[locale]} />
            </Link>
          ))
        }
      </div>
    </section>
  );
}
