import Link from 'next/link';
import PropTypes from 'prop-types';

function Cta({ children, theme, ...other }) {
  const styles = {
    primary: 'border-primary text-primary hover:bg-primary',
    secondary: 'border-secondary text-secondary hover:bg-secondary'
  };

  return (
    <Link
      className={`${styles[theme]} hover:text-white border-2 rounded-full px-5 py-1.5 bg-white/0 transition-all duration-300`}
      {...other}
    >
      {children}
    </Link>
  );
}

Cta.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['primary', 'secondary']),
}

Cta.defaultProps = {
  theme: 'primary'
}

export default Cta;