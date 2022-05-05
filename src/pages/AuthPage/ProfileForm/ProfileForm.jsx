import * as React from 'react'
import { useState } from 'react'
import { inputs } from './inputs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { TextareaAutosize, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { usePostRequest } from '../../../utils/hooks/custom.hooks'
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../../utils/context/context'

function ProfileForm() {
  const [profileInputs, setprofileInputs] = useState({})
  const [formErrors] = useState({})
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const { user } = useContext(UserContext)

  let token = ''
  if (user) {
    token = user.user.token
  }

  const { error, isLoading } = usePostRequest(
    'profile',
    profileInputs,
    readyToSubmit,
    formErrors,
    token
  )

  //set input values to credentials state
  const handleValues = (e) => {
    setprofileInputs({
      ...profileInputs,
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
        <Typography
          variant="h6"
          component={'h2'}
          sx={{ textAlign: 'center' }}
          fullWidth
          color="success.light"
        >
          Votre compte a été créé avec succes ! <br />
          Aidez vos collègues à mieux vous connaître en complétant votre profil.
        </Typography>
        {/* firstName */}
        <TextField
          sx={{ width: '45%', marginRigth: '0.5em' }}
          variant="standard"
          margin="normal"
          required
          autoFocus
          label="Prénom"
          name="firstName"
          type="text"
          value={profileInputs.firstName}
          onChange={handleValues}
          error={formErrors.firstname ? true : false}
        />
        <Typography component="span" variant="body2" color="error.light">
          {formErrors.firstName}
        </Typography>
        {/* lastName */}
        <TextField
          sx={{ width: '45%', marginLeft: '1em' }}
          variant="standard"
          margin="normal"
          required
          autoFocus
          label="Nom"
          name="lastName"
          type="text"
          value={profileInputs.lastName}
          onChange={handleValues}
          error={formErrors.lastName ? true : false}
        />
        <Typography component="span" variant="body2" color="error.light">
          {formErrors.lastName}
        </Typography>
        <br />
        {/* BIO */}
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          autoFocus
          label="A propos de vous"
          name="bio"
          type="text"
          value={profileInputs.bio}
          onChange={handleValues}
        />
        <Typography component="span" variant="body2" color="error.light">
          {formErrors.bio}
        </Typography>
        {/* Avatar */}
        <TextField
          sx={{ marginTop: '1em' }}
          name="file"
          fullWidth
          type="file"
        />
        {/* Api errors */}
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
          {isLoading ? <CircularProgress size={'1.7em'} /> : 'Sauvegarder'}
        </Button>
      </Box>
    </>
  )
}

export default ProfileForm
