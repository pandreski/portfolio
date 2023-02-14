import Image from 'next/image';
import developerPicture from '@/public/developer.svg';

function Introduction() {
  return (
    <section className='bg-sky-blue'>
      <div className='container mx-auto md:w-10/12 lg:w-7/12 px-5 pt-20 pb-44 lg:pt-28 lg:pb-80 text-center relative'>
        <Image src={developerPicture} alt='' className='absolute left-5 md:left-0 bottom-full md:translate-x-0 translate-y-11 md:translate-y-16 max-w-[235px] md:max-w-[345px]' />
        <h2 className='font-serif text-deep-green text-2xl md:text-3xl'>Bonjour, moi c’est Pierre...</h2>
        <p className='mt-8 md:mt-20'>
          Développeur depuis plus de 8 ans maintenant, j’ai principalement fait mes armes dans des agences de communication en France et au Luxembourg.<br /><br />
          J’ai débuté ma carrière en développant des sites web pour des clients de toutes tailles en leur proposant des solutions WordPress et Drupal. Longtemps soucieux de maîtriser tous les aspects du métier, je suis à l’aise aussi bien en back-end (PHP) qu’en front-end (JavaScript, CSS/Sass).<br /><br />
          Toutefois, j’ai récemment fait le pari de me focaliser sur l’aspect front-end tout en me spécialisant dans la maîtrise de React JS. Et bientôt, j’aurai à coeur d’utiliser Node JS pour le back-end (sans rancune PHP 💙).
        </p>
      </div>
    </section>
  );
}

export default Introduction;