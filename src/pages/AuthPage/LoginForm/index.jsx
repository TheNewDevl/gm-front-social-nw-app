import { useState, useEffect, Fragment } from 'react'

import { inputs } from './inputs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

//import { usePostRequest } from '../../../utils/hooks/custom.hooks'
import { CircularProgress } from '@mui/material'
import { loginValidation } from '../../../utils/validators'
import { instance } from '../../../api/axios'

import { usePostRequest } from '../../../api/axios'

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [btnState, setBtnState] = useState(true)
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

  //dynamic errors display
  useEffect(() => {
    const errors = loginValidation(credentials)
    if (credentials.username) {
      setFormErrors(({ password }) => {
        return { password, username: errors.username }
      })
    }
    if (credentials.password) {
      setFormErrors(({ username }) => {
        return { username, password: errors.password }
      })
    }
    Object.keys(errors).length === 0 ? setBtnState(false) : setBtnState(true)
  }, [credentials])

  /** Check the the input values validity, set formerror and submit state */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = loginValidation(credentials)
    setFormErrors(errors)

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
          <Fragment key={index}>
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
              error={formErrors[input.name] ? true : false}
              onChange={handleValues}
            />
            <Typography
              key={`${index}-${input.name}`}
              component="span"
              variant="body2"
              color="error.light"
            >
              {formErrors[input.name]}
            </Typography>
          </Fragment>
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
          disabled={isLoading || btnState ? true : false}
        >
          {isLoading ? <CircularProgress size={'1.7em'} /> : 'Se connecter'}
        </Button>
      </Box>
    </>
  )
}

export default Login
