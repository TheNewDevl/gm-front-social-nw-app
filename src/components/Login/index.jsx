import { useState } from 'react'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [data, setData] = useState('')

  async function submit(e) {
    e.preventDefault()
    const body = {
      username,
      password,
    }
    fetchData('auth/login', 'POST', body)

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
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)} action="">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Mot de passe"
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login
