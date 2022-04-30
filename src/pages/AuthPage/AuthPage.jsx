import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './Login'
import SignUp from './Signup'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {
  CssBaseline,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'

function Home({ setUser, user }) {
  //used to display sign up or login form
  const [hasAccount, setHasAccount] = useState(false)

  // if an user is set, redirect to the posts page
  if (user) return <Navigate to="/posts" replace />

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2015/03/11/12/31/buildings-668616_960_720.jpg)`,
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

            {hasAccount ? (
              <Login setUser={setUser} />
            ) : (
              <SignUp setUser={setUser} />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Home
