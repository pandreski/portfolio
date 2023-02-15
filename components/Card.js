import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function Card({ title, subtitle, list, desktopOrder }) {
  const order = {
    1: 'md:order-1 md:mt-16',
    2: 'md:order-2',
    3: 'md:order-3 md:mt-32',
  }

  return (
    <div className={`${order[desktopOrder]} bg-white rounded-lg shadow-lg px-4 py-10 text-center`}>
      <p className='font-serif text-deep-green text-2xl'>
        {title}
      </p>
      <p className='italic mt-7'>
        {subtitle}
      </p>
      <div className='mt-6 leading-8'>
        {list.map((item) => <p key={uuidv4()}>{item}</p>)}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  desktopOrder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}
