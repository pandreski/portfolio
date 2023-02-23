import Head from 'next/head';
import Hero from '@/components/homepage/Hero';
import Introduction from '@/components/homepage/Introduction';
import Knowledge from '@/components/homepage/Knowledge';
import Projects from '@/components/homepage/Projects';
import Companies from '@/components/homepage/Companies';
import Testimonials from '@/components/homepage/Testimonials';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const locale = router.locale ? router.locale : router.defaultLocale;
  const desc = {
    fr: "Portfolio de Pierre Andreski, développeur Front-End JavaScript et React JS. Plus de 8 ans d'expérience : sans doute le profil qu'il manque dans votre équipe !",
    en: "Pierre Andreski's portfolio, Front-End JavaScript and ReactJS developer. More than 8 years of experience: without a doubt the profile that your team is missing!"
  }
  return (
    <>
      <Head>
        <title>Pierre Andreski - Portfolio</title>
        <meta name="description" content={desc[locale]} />
        <meta property="og:title" content="Pierre Andreski - Portfolio" />
        <meta property="og:description" content={desc[locale]} />
      </Head>
      <main>
        <Hero />
        <Introduction />
        <Knowledge />
        <Projects />
        <Companies />
        <Testimonials />
      </main>
    </>
  )
}
