import { useState } from 'react'

export default async function FetchData(uri, method = 'GET', body = '') {
  const [data, setData] = useState('')
  const [error, setError] = useState()

  try {
    const response = await fetch(`http://localhost:3000/${uri}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (response.status >= 400) {
      setError(data.message)
    }
    setData(data)
    return data
  } catch (error) {
    setError(error.message)
    console.log(error)
  }
  return data, error
}
