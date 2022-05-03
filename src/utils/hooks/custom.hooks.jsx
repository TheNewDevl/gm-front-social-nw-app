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

/* 
useEffect(() => {
  async function autoLogin() {
    if (data && data.message === 'Utilisateur créé avec succes') {
      const { responseData } = await setDataFetch('auth/login', 'POST', {
        username: credentials.username,
        password: credentials.password,
      })
      setUser(responseData)
      setCredentials('')
    }
  }
  autoLogin()
}, [data])
 */

/* import { useState, useEffect } from 'react'
//Our custom hook 'useAsyncData'

// Options:
// fetchFn (required): the function to execute to get data
// loadOnMount (opt): load the data on component mount
// clearDataOnLoad (opt): clear old data on new load regardless of success state
export function useFetch({ fetchState = false, uri, method, body }) {
  // Our data fetching state variables
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(false)
  console.log(fetchState)

  // A function to handle all the data fetching logic
  async function loadData() {
    setLoading(true)
    console.log('post running')
    try {
      const response = await fetch(`http://localhost:3000/${uri}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // 'onMount'
  // maybe load the data if required
  useEffect((loadData) => {
    if (fetchState && fetchState === true) {
      loadData()
      console.log('state ok ')
    }
  }, [])

  // Return the state and the load function to the component
  return { data, isLoading, error, setError, loadData }
}

/*   return { data, isLoading, error } */

/* import { useEffect, useState } from 'react'

export function useFetch(uri, method, body = '') {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData(uri, method, body = '') {
      try {
        const response = await fetch(`http://localhost:3000/${uri}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [uri])

  return { data, isLoading, error }
}
 */
