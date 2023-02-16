import PropTypes from 'prop-types'

export default function SectionTitle({ title }) {
  return <h2 className='font-serif text-deep-green text-2xl md:text-3xl'>{title}</h2>;
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired
}
