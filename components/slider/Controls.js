import { ArrowLeft, ArrowRight } from '../Icons';
import styles from './Controls.module.css';

export default function Controls() {
  const buttonStyle = 'group border-2 border-primary rounded-full w-8 h-8 flex justify-center items-center mx-1.5 disabled:opacity-50 enabled:hover:bg-primary enabled:transition-color enabled:duration-300';
  const arrowStyle = 'fill-primary group-enabled:group-hover:fill-white transition-color duration-300';

  return (
    <>
      <div className="splide__arrows flex justify-center mt-5">
        <button className={`${buttonStyle} splide__arrow splide__arrow--prev`} title='Prev'>
          <ArrowLeft className={`${arrowStyle}`} />
        </button>
        <button className={`${buttonStyle} splide__arrow splide__arrow--next`} title='Next'>
          <ArrowRight className={`${arrowStyle}`} />
        </button>
      </div>

      <ul className={`${styles.pagination} splide__pagination`}></ul>
    </>
  );
}
