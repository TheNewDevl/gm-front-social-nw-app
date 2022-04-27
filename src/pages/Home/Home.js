import { useState } from 'react'
import Login from '../../components/Login'
import SignUp from '../../components/Signup'

function Home() {
  const [hasAccount, setHasAccount] = useState(false)
  function handleClick(param) {
    setHasAccount(param)
  }

  return (
    <div>
      <header>
        <h1>GROUPOMANIA</h1>
        <p>Lorem ipsum dolor sit </p>
      </header>

      <main>
        <div>
          <h2 onClick={() => handleClick(true)}>Connexion</h2>
          <h2 onClick={() => handleClick(false)}>Inscription</h2>

          {hasAccount ? <Login /> : <SignUp />}
        </div>
      </main>
    </div>
  )
}

export default Home
