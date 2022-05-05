import React, { useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import GlobalStyle from './styles/GlobalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { CssBaseline } from '@mui/material'
import ProtectedRoute from './auth/ProtectedRoute'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import { useContext } from 'react'
import { UserContext } from './utils/context/context'

function App() {
  const { user, setUser, hasProfile, setHasProfile } = useContext(UserContext)
  //Retrieve user information from local storage and pass it to user state. it avoids a reconnection in case of accidental reload for example
  console.log(hasProfile)
  useEffect(() => {
    const local = sessionStorage.getItem('user')
    if (local && local.includes('token')) setUser(JSON.parse(local))

    console.log()
    const profile = sessionStorage.getItem('hasProfile')
    profile && setHasProfile(profile)
  }, [])

  //Save user information in local storage
  useEffect(() => {
    user && sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const theme = createTheme({
    palette: {
      primary: blue,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <GlobalStyle />

        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
