import { useEffect, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Login from './LoginForm'
import SignUp from './SignupForm'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {
  CssBaseline,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'
import { UserContext } from '../../utils/context/UserContext'

import homeIllustration from '../../assets/home-illustration.jpg'
import darkHomeIllustration from '../../assets/darkmode-home-illustration.jpg'
import CreateProfileDiag from './CreateProfileDiag'

function Home() {
  const { user, hasProfile } = useContext(UserContext)
  const theme = useTheme()

  //used to display sign up or login form
  const [hasAccount, setHasAccount] = useState(true)
  const [toggleValue, settoggleValue] = useState('login')

  const [openPopUp, setOpenPopUp] = useState(false)

  useEffect(() => {
    if (user && user.user?.hasProfile === 0) {
      setOpenPopUp(true)
    }
  }, [user])

  const handleClick = (e) => {
    const value = e.currentTarget.value
    settoggleValue(() => value)
    value === 'signup'
      ? setHasAccount((s) => false)
      : setHasAccount((s) => true)
  }

  // if an user is set, redirect to the posts page
  if (user && (user.user.hasProfile === 1 || hasProfile === true))
    return <Navigate to="/" replace />

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            theme.palette.mode === 'light'
              ? `url(${homeIllustration})`
              : `url(${darkHomeIllustration})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 4,
            mx: 4,
          }}
        >
          <Typography
            sx={{ textAlign: 'center' }}
            component="h1"
            variant="h4"
            color="primary.main"
          >
            GROUPOMANIA
          </Typography>
          <Typography
            component="p"
            variant="overline"
            sx={{ textAlign: 'center' }}
            color="primary.light"
          >
            Rejoignez nous vite afin de consulter les dernières nouvelles
          </Typography>
          <Box
            sx={{
              m: 4,
            }}
          >
            {!user && (
              <ToggleButtonGroup
                color="primary"
                fullWidth
                value={toggleValue}
                exclusive
              >
                <ToggleButton onClick={handleClick} size="large" value="signup">
                  S'inscrire
                </ToggleButton>
                <ToggleButton onClick={handleClick} value="login">
                  Se connecter
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            {!user && hasAccount && <Login />}
            {!user && !hasAccount && <SignUp />}
            {user && user.user.hasProfile === 0 && (
              <CreateProfileDiag open={openPopUp} />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Home
