import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import config from '../utils/config'
import { UserContext } from '../utils/context/UserContext'

export const instance = axios.create({
  baseURL: config.BASE_URL,
  validateStatus: (status) => status >= 200 && status < 300,
})

/** Used for post sign up and login post requests */
export function usePostRequest(uri, credentials, readyToSubmit, formErrors) {
  const { setUser, setHasProfile } = useContext(UserContext)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  instance.interceptors.response.use(function (response) {
    console.log(response)
    if (response.data.message === 'Identification réussie') {
      setUser(response.data)
    }
    if (response.data.message === 'Profil sauvegardé') {
      setHasProfile('1')
      sessionStorage.setItem('hasProfile', '1')
    }
    if (response.data.message.hasOwnProperty('token')) {
      setUser(response.data)
    }
    if (response.data.message === 'Utilisateur créé avec succes') {
      uri = 'auth/login'
      makeRequest()
    }
    return response
  })

  async function makeRequest() {
    setLoading(true)
    try {
      const response = await instance.post(uri, credentials)
      console.log(response)
      setData(response)
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && readyToSubmit) {
      delete credentials.passwordConfirm
      makeRequest()
    }
  }, [formErrors, readyToSubmit])

  return { data, error, isLoading }
}
