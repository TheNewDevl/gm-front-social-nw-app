import { useState, createContext, useEffect } from 'react'
import useSecureAxios from '../hooks/useSecureAxios'

export const RequestsContext = createContext()
export const RequestsProvider = ({ children }) => {
  const [requestData, setRequestData] = useState()
  const [requestError, setRequestError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const secureAxios = useSecureAxios()

  const makeRequest = async (method, url, data) => {
    setIsLoading(true)
    try {
      const response = await secureAxios({
        method,
        url,
        data,
      })
      setRequestData(() => response?.data)
      console.log(response.data)
    } catch (err) {
      if (err?.response?.data?.message) {
        setRequestError(err.response.data.message)
        throw new Error(err.response.data.message)
      } else if (err?.request) {
        setRequestError('Pas de réponse du serveur')
        throw new Error('Pas de réponse du serveur')
      } else {
        setRequestError(err.message)
        console.log(err)
        throw new Error(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const useGetData = (uri) => {
    //init states for data, loader and errors
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const secureAxios = useSecureAxios()

    useEffect(() => {
      if (!uri) throw new Error('You must specify an url')
      setLoading(true)

      async function getData() {
        try {
          const response = await secureAxios.get(uri)
          setData(() => response?.data)
        } catch (error) {
          console.log(error)
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      getData()
    }, [uri])

    return { isLoading, data, error }
  }

  return (
    <RequestsContext.Provider
      value={{
        requestData,
        setRequestData,
        requestError,
        setRequestError,
        isLoading,
        setIsLoading,
        makeRequest,
        useGetData,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}
