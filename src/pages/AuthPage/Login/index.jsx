import * as React from 'react'
import { useEffect, useState } from 'react'

import { inputs } from '../Login/inputs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import validateCredentials from '../../../utils/validators'

//test
import FetchData from '../../../auth/AuthFetch'

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [data, setData] = useState('')
  const [error, setError] = useState()

  //set input values to credentials state
  const handleValues = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  /** Check the the input values validity and make a POST request if no errors */
  async function handleSubmit(e) {
    e.preventDefault()

    const validationError = validateCredentials(credentials)
    setError(validationError)

    if (!error) FetchData('auth/login', 'POST', credentials)
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
        >
          Se connecter
        </Button>
      </Box>
    </>
  )
}

export default Login
