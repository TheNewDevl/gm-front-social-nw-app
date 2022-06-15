import { useState, createContext, useEffect } from 'react'
import useSecureAxios from '../hooks/useSecureAxios'

export const RequestsContext = createContext()

export const RequestsProvider = ({ children }) => {
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
        useGetData,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}
