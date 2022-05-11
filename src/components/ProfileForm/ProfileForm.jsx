import * as React from 'react'
import { useState } from 'react'

import {
  Avatar,
  Typography,
  Input,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'

import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'
import './ProfileForm.scss'

import { useFetch } from '../../utils/hooks/custom.hooks'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Loader from '../../components/Loader/Loader'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

function ProfileForm({ method, uri = '' }) {
  const [profileInputs, setprofileInputs] = useState({
    firstName: '',
    lastName: '',
    bio: '',
  })
  const [file, setFile] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [formErrors] = useState({})
  const { user, setHasProfile } = useContext(UserContext)
  const [successAlert, setSuccessAlert] = useState(false)

  //if the profile has already been created, the fields are pre-filled with the profile data
  const { data, isLoading } = useFetch(`profile/${user.user.id}`)
  React.useEffect(() => {
    if (data)
      setprofileInputs({
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
      })
  }, [data])

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
      data.append('firstName', profileInputs.firstName)
      data.append('lastName', profileInputs.lastName)
      data.append('bio', profileInputs.bio)

      const response = await fetch(`http://localhost:3000/api/profile/${uri}`, {
        method: method,
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

      //set success alert if res ok
      if (response.ok) setSuccessAlert(true)
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  //will display a profile picture if it exists
  const ProfilePic = () => {
    if (data) {
      return (
        <Avatar
          className="profilePic"
          sx={{ width: 150, height: 150 }}
          src={data.photo}
          alt="Photo de profil"
        />
      )
    }
  }

  //handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessAlert(false)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <ProfilePic />
          {/* firstName */}
          <div className="names__container">
            <TextField
              className="input__name"
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

            {/* lastName */}
            <TextField
              className="input__name"
              variant="standard"
              margin="normal"
              required
              label="Nom"
              name="lastName"
              type="text"
              value={profileInputs.lastName}
              onChange={handleValues}
              error={formErrors.lastName ? true : false}
            />
          </div>
          <Typography component="span" variant="body2" color="error.light">
            {formErrors.lastName}
          </Typography>
          <Typography component="span" variant="body2" color="error.light">
            {formErrors.firstName}
          </Typography>
          <br />
          {/* BIO */}
          <TextareaAutosize
            className="bio__input"
            required
            minRows={4}
            name="bio"
            aria-label="A propos de vous"
            placeholder="Quelques mots à propos de vous"
            value={profileInputs.bio}
            onChange={handleValues}
          />
          <label className="bio__label" htmlFor="bio">
            A propos de moi *
          </label>

          <Typography component="span" variant="body2" color="error.light">
            {formErrors.bio}
          </Typography>
          {/* Avatar */}
          <Input
            accept="image/*"
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
            disabled={loading ? true : false}
          >
            {loading ? <CircularProgress size={'1.7em'} /> : 'Sauvegarder'}
          </Button>

          <Snackbar
            open={successAlert}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Modifications enregistrées !
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  )
}

export default ProfileForm
