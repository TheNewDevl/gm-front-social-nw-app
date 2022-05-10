import './Loader.scss'

const Loader = ({ color }) => {
  return <div className={color ? `loader loader--${color}` : 'loader'}></div>
}

export default Loader
