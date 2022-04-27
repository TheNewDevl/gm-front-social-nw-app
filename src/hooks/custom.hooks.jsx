import { useEffect, useState } from 'react'

export function useFetch(uri) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData(uri, method = 'GET', body = '') {
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
