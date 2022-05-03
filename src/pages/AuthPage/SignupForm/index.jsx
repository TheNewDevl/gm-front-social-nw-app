import * as React from 'react'
import { useEffect, useState } from 'react'

import { inputs } from './inputs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import validateCredentials from '../../../utils/validators'
import { useContext } from 'react'
import { UserContext } from '../../../utils/context/context'

import { usePostRequest } from '../../../utils/hooks/custom.hooks'

const SignUp = () => {
  const { user, setUser } = useContext(UserContext)

  const [formErrors, setFormErrors] = useState({})
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [readyToSubmit, setReadyToSubmit] = useState(false)

  const { error } = usePostRequest(
    'auth/signup',
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
    const errors = validateCredentials(credentials)
    setFormErrors(errors)
    setReadyToSubmit(true)

    setTimeout(() => {
      setReadyToSubmit(false)
    }, 1000)
  }

  return (
    <>
      <Box noValidate component="form" onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <>
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
              value={credentials[input.name]}
              onChange={handleValues}
              error={formErrors[input.name] ? true : false}
            />
            <Typography
              key={`${index}-${input.name}`}
              component="span"
              variant="body2"
              color="error.light"
            >
              {formErrors[input.name]}
            </Typography>
          </>
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
          S'inscrire
        </Button>
      </Box>
    </>
  )
}

export default SignUp
