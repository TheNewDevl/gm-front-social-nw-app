import { useContext, useEffect } from 'react'
import { UserContext } from '../utils/context/UserContext'
import axios from '../api/axios'

/** Used for post sign up and login post requests */
export function AuthInterceptors() {
  const { setUser, setHasProfile } = useContext(UserContext)

  const loginUri = 'auth/login'

  const loginCallBack = async (stringCreds) => {
    const creds = JSON.parse(stringCreds)
    try {
      await axios.post(loginUri, {
        username: creds.username,
        password: creds.password,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const authInterceptors = axios.interceptors.response.use(
      (response) => {
        if (response.data.message === 'Identification réussie') {
          setUser(response.data)
          return response
        }
        if (response.data.message === 'Utilisateur créé avec succes') {
          loginCallBack(response.config.data)
          return response
        }
        if (response?.data.message === 'Profil sauvegardé') {
          setHasProfile('1')
          sessionStorage.setItem('hasProfile', '1')
          return response
        }
      },
      (error) => Promise.reject(error)
    )
    return () => {
      axios.interceptors.response.eject(authInterceptors)
    }
  }, [axios])

  return ''
}
