const config = {
  get BASE_URL() {
    if (process.env.NODE_ENV === 'development') {
      return this.getKey('REACT_APP_LOCALIP_URL_API')
    } else {
      return this.getKey('REACT_APP_API_BASEURL_PROD')
    }
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
