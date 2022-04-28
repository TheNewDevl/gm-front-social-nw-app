import { useState } from 'react'
import Login from '../../components/Login'
import SignUp from '../../components/Signup'
import HomeIllustration from '../../assets/home-illustration.jpg'
import * as style from './style.js'

function Home() {
  const [hasAccount, setHasAccount] = useState(false)
  function handleClick(param) {
    setHasAccount(param)
  }

  return (
    <style.HomeWraper>
      <style.IllustrationContainer>
        <style.HomeImage
          src={HomeIllustration}
          alt="Illustration page d'accueil"
        />
      </style.IllustrationContainer>
      <div>
        <style.AuthHeader>
          <h1>GROUPOMANIA</h1>
          <p>Lorem ipsum dolor sit </p>
        </style.AuthHeader>

        <style.Main>
          <style.AuthChoicesWraper>
            <style.SignInButton onClick={() => handleClick(true)}>
              Se connecter
            </style.SignInButton>
            <style.SignInButton onClick={() => handleClick(false)}>
              S'inscrire
            </style.SignInButton>
          </style.AuthChoicesWraper>

          {hasAccount ? <Login /> : <SignUp />}
        </style.Main>
      </div>
    </style.HomeWraper>
  )
}

export default Home
