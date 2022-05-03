import { useEffect, useState } from 'react'
import { useContext } from 'react'

import { UserContext } from './utils/context/context'
import setDataFetch from './utils/api/fetchApi'

export function useRequest(uri, formErrors, readyToSubmit, credentials) {
  const { user, setUser } = useContext(UserContext)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function makeRequest() {
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
        setData(dataApi)
        if (dataApi.hasOwnProperty('token')) setUser(dataApi)
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
    }
    if (Object.keys(formErrors).length === 0 && readyToSubmit) {
      delete credentials.passwordConfirm
      makeRequest()
    }
  }, [formErrors, readyToSubmit])

  return { data, error }
}

/* import { useEffect, useState } from 'react'
import { useContext } from 'react'

import { UserContext } from './utils/context/context'
import setDataFetch from './utils/api/fetchApi'

export function useRequest(uri, formErrors, readyToSubmit, credentials) {
  const { user, setUser } = useContext(UserContext)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(formErrors)
    console.log(readyToSubmit)
    async function makeRequest() {
      const { responseError, responseData } = await setDataFetch(
        uri,
        'POST',
        credentials
      )
      console.log(responseError)
      setError(responseError)
      setData(responseData)
      if (responseData.hasOwnProperty('token')) setUser(responseData)
    }
    if (Object.keys(formErrors).length === 0 && readyToSubmit) {
      delete credentials.passwordConfirm
      makeRequest()
    }
  }, [formErrors, readyToSubmit])

  return { data, error }
}

 */
