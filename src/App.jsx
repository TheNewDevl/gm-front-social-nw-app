import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Interactions from './pages/Interactions/Interactions'
import ProtectedRoute from './auth/ProtectedRoute'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FeedBackAlert from './components/Alert/TestAlert'
import { Themes } from './styles/themes'
import PersitSession from './auth/PersitSession'
import OtherUserPosts from './components/OtherUserPosts/OtherUserPosts'
import ScrollTopBtn from './components/ScrollTopBtn/ScrollTopBtn'

function App() {
  return (
    <ThemeProvider theme={Themes.customTheme()}>
      <BrowserRouter>
        <CssBaseline />
        <ScrollTopBtn />

        <Header />
        <FeedBackAlert />

        <Routes>
          <Route element={<PersitSession />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/profile/interactions" element={<Interactions />} />
              <Route
                path="/publications/:id/:username"
                element={<OtherUserPosts />}
              />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
