import * as React from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../../utils/context/context'

function ProfileForm() {
  const [profileInputs, setprofileInputs] = useState({})
  const [file, setFile] = useState()
  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(false)

  const [formErrors] = useState({})
  const { user, setHasProfile } = useContext(UserContext)

  //set input values to credentials state
  const handleValues = (e) => {
    setprofileInputs({
      ...profileInputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const data = new FormData()
      //append file only if file exists (back requirement)
      file && data.append('file', file)
      data.append('firstName', profileInputs)
      data.append('lastName', profileInputs)
      data.append('bio', profileInputs)

      const response = await fetch('http://localhost:3000/api/profile/', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRespose = await response.json()
      console.log(parsedRespose)
      if (parsedRespose.message === 'Profil sauvegardé') {
        setHasProfile('1')
        sessionStorage.setItem('hasProfile', '1')
      }
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center' }}
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
          onChange={handleFile}
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
