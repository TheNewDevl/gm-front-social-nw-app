const Loader = ({ color, style }) => {
  let baseStyle = {
    margin: 'auto',
    padding: '10px',
    border: '6px solid #4db3e9',
    borderColor: color ? '#fff' : '#4db3e9',
    borderBottomColor: 'transparent',
    borderRadius: '22px',
    animation: 'rotate 1s infinite linear',
    height: '0',
    width: '0',
    ...style,
  }

  return <div style={baseStyle}></div>
}

export default Loader
