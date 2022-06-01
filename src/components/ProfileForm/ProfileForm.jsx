import { useState, useEffect } from 'react'
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material'
import { useContext } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { UserContext } from '../../utils/context/UserContext'
import './ProfileForm.scss'
import { useFetch } from '../../utils/hooks/custom.hooks'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Loader from '../../components/Loader/Loader'
import { PhotoCamera } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { AuthInterceptors } from '../../interceptors/AuthInterceptors'
import axios from '../../api/axios'

function ProfileForm({ method }) {
  const theme = useTheme()
  const [profileInputs, setprofileInputs] = useState({
    firstName: '',
    lastName: '',
    bio: '',
  })
  const [file, setFile] = useState({
    file: '',
    urlForPreview: null,
  })
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [formErrors] = useState({})
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)
  const [profileId, setProfileId] = useState('')
  const uri = `profile/${profileId}`

  //if the profile has already been created, the fields are pre-filled with the profile data
  const { data, isLoading } = useFetch(`profile/${user.user.id}`)
  useEffect(() => {
    if (data) {
      setprofileInputs({
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
      })
      setProfileId(data.id)
    }
  }, [data])

  //set input values to credentials state
  const handleValues = (e) => {
    setprofileInputs({
      ...profileInputs,
      [e.target.name]: e.target.value,
    })
  }

  //delete uploaded file
  const handleDete = () => {
    setFile({
      file: '',
      urlForPreview: null,
    })
  }
  const handleFile = (e) => {
    setFile({
      file: e.target.files[0],
      //for preview img
      urlForPreview: URL.createObjectURL(e.target.files[0]),
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const data = new FormData()
    //append file only if file exists (back requirement)
    file.file && data.append('file', file.file)
    data.append('firstName', profileInputs.firstName)
    data.append('lastName', profileInputs.lastName)
    data.append('bio', profileInputs.bio)
    try {
      if (method === 'POST') {
        await axios.post(uri, data, {
          headers: { Authorization: `Bearer ${user.user.token}` },
        })
      }

      if (method === 'PATCH') {
        await axios.patch(uri, data, {
          headers: { Authorization: `Bearer ${user.user.token}` },
        })
      }
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Modifications enregistrées !',
      })
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      } else if (err.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
        console.log(err)
      }
      setAlertStates({
        open: true,
        type: 'error',
        message: error,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthInterceptors />
      {isLoading ? (
        <Loader />
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          {data || file.urlForPreview ? (
            <Avatar
              className="profilePic"
              sx={{ width: 150, height: 150 }}
              src={file.urlForPreview ? file.urlForPreview : data.photo}
              alt="Photo de profil"
            />
          ) : null}
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
            style={{ backgroundColor: `${theme.palette.background.default}` }}
            sx={{
              resize: 'none',
              backgroundColor: `${theme.palette.background.default}`,
            }}
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
          <br />
          {/* Avatar */}

          {/* Api errors */}
          {error && (
            <Typography component="span" variant="body1" color="error.light">
              {error}
            </Typography>
          )}
          <Stack
            mt="1em"
            // direction={theme.breakpoints.up('sm') && 'row'}
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
            sx={{
              width: '100%',
              [theme.breakpoints.up('sm')]: { flexDirection: 'row' },
            }}
          >
            <label htmlFor="file">
              <Button
                fullWidth
                sx={{
                  [theme.breakpoints.up('sm')]: { width: '180px' },
                }}
                variant="outlined"
                component="label"
              >
                Image
                <PhotoCamera className="upload__icon" />
                <input
                  sx={{ marginTop: '1em' }}
                  className="upload__input"
                  accept="image/*"
                  type="file"
                  name="file"
                  onChange={handleFile}
                  hidden
                />
              </Button>
            </label>
            {file.urlForPreview && (
              <Button
                sx={{
                  [theme.breakpoints.up('sm')]: { width: '180px' },
                }}
                variant="outlined"
                color="error"
                onClick={handleDete}
              >
                Supprimer <PhotoCamera className="upload__icon" />
              </Button>
            )}
            <Button
              sx={{
                [theme.breakpoints.up('sm')]: { width: '180px' },
              }}
              type="submit"
              variant="contained"
              disabled={loading ? true : false}
            >
              {loading ? <CircularProgress size={'1.7em'} /> : 'Sauvegarder'}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default ProfileForm
