import { useState } from 'react'
import {
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  matches,
  maxLength,
  minLength,
} from 'class-validator'

function Login() {
  const [data, setData] = useState('')
  const [error, setError] = useState('')
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleValues = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
    console.log(credentials)
  }

  function checkCredentials(credentials) {
    if (credentials.password !== credentials.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas')
      return false
    }
    if (!isEmail(credentials.email)) {
      setError('Email invalide')
      return false
    }
    if (
      !isNotEmpty(credentials.username) ||
      !isAlphanumeric(credentials.username) ||
      !minLength(credentials.username, 3) ||
      !maxLength(credentials.username, 20)
    ) {
      setError("Le nom d'utilisateur est invalide")
      return false
    }
    if (
      !matches(
        credentials.password,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;,:_-])[A-Za-z0-9.;,:_-]{8,30}$/
      )
    ) {
      setError(
        'Mot de passe invalide ! Doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (.-,)'
      )
      return false
    }
    setError('')
    return true
  }

  async function submit(e) {
    e.preventDefault()
    //checkCredentials(credentials)

    delete credentials.passwordConfirm
    const data = await fetchData('auth/signup', 'POST', credentials)
    console.log(error)
  }

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
      if (response.status > 300) {
        setError(data.message)
      }
      setData(data)
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={(e) => submit(e)} action="">
        {error && <span>{error}</span>}
        <label htmlFor="username">Nom d'utilisateur</label>
        <input onChange={handleValues} name="username" type="text" />
        <label htmlFor="password">Mot de passe</label>
        <input onChange={handleValues} name="password" type="password" />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
