/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/context'

/** Used for post sign up and login post requests */
export function usePostRequest(uri, credentials, readyToSubmit, formErrors) {
  const { setUser } = useContext(UserContext)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  console.log(readyToSubmit)

  async function makeRequest() {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/${uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      const dataApi = await response.json()
      if (response.status >= 400) {
        setError(dataApi.message)
      }
      if (
        response.status === 201 &&
        dataApi.message === 'Identification réussie'
      ) {
        setUser(dataApi)
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
