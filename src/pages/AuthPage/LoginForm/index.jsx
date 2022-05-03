import * as React from 'react'
import { useState } from 'react'

import { inputs } from './inputs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { usePostRequest } from '../../../utils/hooks/custom.hooks'
import { CircularProgress } from '@mui/material'

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [formErrors] = useState({})
  const [readyToSubmit, setReadyToSubmit] = useState(false)

  const { error, isLoading } = usePostRequest(
    'auth/login',
    credentials,
    readyToSubmit,
    formErrors
  )

  //set input values to credentials state
  const handleValues = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  /** Check the the input values validity, set formerror and submit state */
  const handleSubmit = (e) => {
    e.preventDefault()
    setReadyToSubmit(true)
    //Setting this value to false again will let we use the useRequest
    setTimeout(() => {
      setReadyToSubmit(false)
    }, 1000)
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <TextField
            key={index}
            variant="standard"
            margin="normal"
            required
            fullWidth
            autoFocus={input.autofocus ? true : false}
            id={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            value={credentials[input.name]}
            autoComplete="off"
            onChange={handleValues}
          />
        ))}
        {error && (
          <Typography component="span" variant="body1" color="error.light">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading ? true : false}
        >
          {isLoading ? <CircularProgress size={'1.7em'} /> : 'Se connecter'}
        </Button>
      </Box>
    </>
  )
}

export default Login
