import Image from 'next/image';
import PropTypes from 'prop-types';

export default function ProjectCard({ title, image }) {
  return (
    <figure className='group relative w-full aspect-[600/382] rounded-lg overflow-hidden cursor-pointer'>
      <Image src={image} alt={title} width='600' height='382' className='w-full h-full object-cover transition-transform group-hover:lg:scale-105' />
      <figcaption className='absolute p-4 inset-0 bg-deep-green text-white opacity-0 group-hover:lg:opacity-100 transition-opacity duration-300'>
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-lg md:text-2xl text-center'>
          {title}
        </span>
      </figcaption>
    </figure>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}
