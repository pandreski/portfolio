import Link from 'next/link';
import PropTypes from 'prop-types';

function Cta({ children, theme, ...other }) {
  const globalStyle = [
    'hover:text-white',
    'border-2',
    'rounded-full',
    'px-5',
    'py-1.5',
    'bg-white/0',
    'transition-all',
    'duration-300',
  ];

  const primaryStyle = [
    ...globalStyle,
    `border-primary`,
    `text-primary`,
    `hover:bg-primary`,
  ];

  const secondaryStyle = [
    ...globalStyle,
    `border-secondary`,
    `text-secondary`,
    `hover:bg-secondary`,
  ];

  return (
    <Link
      className={theme === 'primary' ? primaryStyle.join(' ') : secondaryStyle.join(' ')}
      {...other}
    >
      {children}
    </Link>
  );
}

Cta.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
}

Cta.defaultProps = {
  theme: 'primary'
}

export default Cta;