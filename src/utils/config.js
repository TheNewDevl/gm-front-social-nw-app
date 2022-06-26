const config = {
  get BASE_URL() {
    return this.getKey('REACT_APP_BASE_URL_API')
  },

  getKey(key) {
    const thisKey = process.env[key]
    if (thisKey === undefined) {
      throw new Error(`You must specify ${key}`)
    } else {
      return thisKey
    }
  },
}

export default config
