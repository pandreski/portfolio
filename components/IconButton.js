import Link from 'next/link';
import PropTypes from 'prop-types';
import { Github, Linkedin } from '@/components/Logos';

export default function IconButton({ theme, icon, extraClass, ...other }) {
  const linkStyle = {
    light: 'border-white hover:bg-white',
    dark: 'border-deep-green hover:bg-deep-green'
  };

  const iconThemeStyle = {
    light: 'fill-white group-hover:fill-deep-green',
    dark: 'fill-deep-green group-hover:fill-white'
  };
  const commonIconStyle = `${iconThemeStyle[theme]} w-5 h-5 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300`;
  const iconType = {
    linkedin: <Linkedin className={`${commonIconStyle}`} />,
    github: <Github className={`${commonIconStyle}`} />
  };

  return (
    <Link
      className={`${linkStyle[theme]} ${extraClass} group w-10 h-10 border-2 relative inline-block rounded-full transition-colors duration-300`}
      title={icon}
      {...other}
    >
      {iconType[icon]}
    </Link>
  );
}

IconButton.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  icon: PropTypes.oneOf(['linkedin', 'github']).isRequired,
  extraClass: PropTypes.string
}

IconButton.defaultProps = {
  theme: 'dark',
  extraClass: ''
}
