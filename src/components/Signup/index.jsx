import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/custom.hooks'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [data, setData] = useState('')

  function matchPassword() {
    password !== confirmPassword
      ? setError('Les mots de passe ne correspondent pas')
      : setError('')
  }

  async function submit(e) {
    e.preventDefault()
    const body = {
      username,
      email,
      password,
    }
    fetchData('auth/signup', 'POST', body)

    console.log(data)
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
      setData(data)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)} action="">
        {/* username */}
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          name="username"
          type="text"
          placeholder="Nom d'utilisateur"
        />
        {/* username */}
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          name="email"
          type="email"
          placeholder="Email"
        />
        {/* username */}
        <label htmlFor="password">Mot de passe</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          name="password"
          type="password"
          placeholder="Mot de passe"
        />
        {/* username */}
        {error ?? <span>{error}</span>}
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          onBlur={(e) => {
            setConfirmPassword(e.target.value)
            matchPassword()
          }}
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}

export default SignUp
