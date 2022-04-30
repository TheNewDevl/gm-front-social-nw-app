import React, { useState } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import GlobalStyle from './styles/GlobalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { CssBaseline } from '@mui/material'
import ProtectedRoute from './auth/ProtectedRoute'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

function App() {
  //Will contain user data from API
  const [user, setUser] = useState(null)
  console.log(user)

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
          <Route
            path="/"
            element={<AuthPage setUser={setUser} user={user} />}
          />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/home" element={<Home setUser={setUser} />} />
            <Route path="/profile" element={<Profile setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App