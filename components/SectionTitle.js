import PropTypes from 'prop-types'

export default function SectionTitle({ title, ...other }) {
  return <h2 className='font-serif text-deep-green text-2xl md:text-3xl' {...other}>{title}</h2>;
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired
}
