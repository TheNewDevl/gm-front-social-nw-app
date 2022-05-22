import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
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
import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'
import ProfileForm from '../../components/ProfileForm/ProfileForm'

import homeIllustration from '../../assets/home-illustration.jpg'
import darkHomeIllustration from '../../assets/darkmode-home-illustration.jpg'

function Home() {
  const { user, hasProfile } = useContext(UserContext)
  const theme = useTheme()
  //used to display sign up or login form
  const [hasAccount, setHasAccount] = useState(false)

  // if an user is set, redirect to the posts page
  if (user && (user.user.hasProfile === 1 || hasProfile === '1'))
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
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" color="primary.main">
            GROUPOMANIA
          </Typography>
          <Typography
            component="p"
            variant="overline"
            sx={{ textAlign: 'center' }}
            color="primary.light"
          >
            Rejoignez vous vite afin de consulter les dernières nouvelles
          </Typography>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTopRightRadius: '200px',
            }}
          >
            {!user && (
              <ToggleButtonGroup
                color="primary"
                fullWidth
                value={hasAccount}
                exclusive
                onChange={() => setHasAccount(!hasAccount)}
              >
                <ToggleButton size="large" value={false}>
                  S'inscrire
                </ToggleButton>
                <ToggleButton value={true}>Se connecter</ToggleButton>
              </ToggleButtonGroup>
            )}
            {!user && hasAccount && <Login />}
            {!user && !hasAccount && <SignUp />}
            {user && user.user.hasProfile === 0 && (
              <>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: 'center' }}
                  color="success.light"
                >
                  Votre compte a été créé avec succes ! <br />
                  Aidez vos collègues à mieux vous connaître en complétant votre
                  profil.
                </Typography>
                <ProfileForm method={'POST'} />
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Home
