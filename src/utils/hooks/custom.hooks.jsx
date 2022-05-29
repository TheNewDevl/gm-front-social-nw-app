/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

/** Used for post sign up and login post requests */
export function usePostRequest(
  uri,
  credentials,
  readyToSubmit,
  formErrors,
  token = null
) {
  const { setUser, setHasProfile } = useContext(UserContext)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function makeRequest() {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}${uri}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credentials),
        }
      )
      const dataApi = await response.json()
      if (response.status >= 400) {
        setError(dataApi.message)
      }
      console.log(dataApi.message)

      if (
        response.status === 201 &&
        dataApi.message === 'Identification réussie'
      ) {
        setUser(dataApi)
      }
      if (dataApi.message === 'Profil sauvegardé') {
        setHasProfile('1')
        sessionStorage.setItem('hasProfile', '1')
      }
      setData(dataApi)
      if (dataApi.hasOwnProperty('token')) setUser(dataApi)
    } catch (error) {
      setError(error.message)
      console.log(error)
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

  useEffect(() => {
    if (data && data.message === 'Utilisateur créé avec succes') {
      uri = 'auth/login'
      makeRequest()
    }
  }, [data])

  return { data, error, isLoading }
}

//used to all get requests
export function useFetch(uri) {
  //init states for data, loader and errors
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!uri) throw new Error('You must specify an url')
    setLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LOCALIP_URL_API}${uri}`,
          {
            headers: {
              Authorization: `Bearer ${user.user.token}`,
            },
          }
        )
        const data = await response.json()
        setData(data)
        setError(false)
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      fetchData()
    }
  }, [uri])

  return { isLoading, data, error }
}
