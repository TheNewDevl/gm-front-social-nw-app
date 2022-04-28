import {
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  matches,
  maxLength,
  minLength,
} from 'class-validator'
import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/custom.hooks'

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [error, setError] = useState()
  const [data, setData] = useState('')

  const handleValues = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
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
      <form onSubmit={submit} action="">
        {/* username */}
        <label htmlFor="username">Nom d'utilisateur</label>
        <input onChange={handleValues} name="username" type="text" />
        {/* email */}
        <label htmlFor="email">Email</label>
        <input onChange={handleValues} name="email" type="email" />
        {/* password */}
        <label htmlFor="password">Mot de passe</label>
        <input onChange={handleValues} name="password" type="password" />
        {/* confirm password */}
        {error && <span>{error}</span>}
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input onChange={handleValues} name="passwordConfirm" type="password" />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}

export default SignUp
