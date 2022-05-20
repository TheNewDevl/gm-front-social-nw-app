import './Loader.scss'

const Loader = ({ color, style }) => {
  return (
    <div
      style={style}
      className={color ? `loader loader--${color}` : 'loader'}
    ></div>
  )
}

export default Loader
