import React, { useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Interactions from './pages/Interactions/Interactions'
import { CssBaseline } from '@mui/material'
import ProtectedRoute from './auth/ProtectedRoute'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import { useContext } from 'react'
import { UserContext } from './utils/context/context'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.scss'
import FeedBackAlert from './components/Alert/TestAlert'

function App() {
  const { user, setUser, setHasProfile } = useContext(UserContext)

  //Retrieve user information from local storage and pass it to user state. it avoids a reconnection in case of accidental reload for example
  useEffect(() => {
    const local = sessionStorage.getItem('user')
    if (local && local.includes('token')) setUser(JSON.parse(local))

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
        <Header />
        <FeedBackAlert />

        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/interactions" element={<Interactions />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
