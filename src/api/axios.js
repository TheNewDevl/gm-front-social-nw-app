import axios from 'axios'
import config from '../utils/config'

export default axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const secureAxios = axios.create({
  baseURL: config.BASE_URL,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
