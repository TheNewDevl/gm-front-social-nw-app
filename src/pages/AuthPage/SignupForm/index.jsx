import * as React from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { inputs } from './inputs'
import validateCredentials from '../../../utils/validators'
import { usePostRequest } from '../../../utils/hooks/custom.hooks'
import { CircularProgress } from '@mui/material'

const SignUp = () => {
  const [formErrors, setFormErrors] = useState({})
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [readyToSubmit, setReadyToSubmit] = useState(false)

  const { error, isLoading } = usePostRequest(
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
          <React.Fragment key={index}>
            <TextField
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
          </React.Fragment>
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
          {isLoading ? <CircularProgress size={'1.7em'} /> : "S'inscrire"}
        </Button>
      </Box>
    </>
  )
}

export default SignUp
