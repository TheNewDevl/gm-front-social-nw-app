import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextareaAutosize,
  Stack,
  Input,
  CircularProgress,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../utils/context/context'
import { PhotoCamera } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './CreatePost.scss'
import SuccessAlert from '../Alert/SuccessAlert'

function CreatePost({ data, setData }) {
  const { user } = useContext(UserContext)
  const [inputs, setInputs] = useState({
    text: '',
    file: '',
    urlForPreview: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  //handle snackbar close
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  //Accordion state
  const [expanded, setExpanded] = useState(false)
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  //Set states for Fetch Request
  const handleText = (e) => {
    setInputs({ ...inputs, text: e.target.value })
  }
  const handleFile = (e) => {
    setInputs({
      ...inputs,
      file: e.target.files[0],
      //for preview img
      urlForPreview: URL.createObjectURL(e.target.files[0]),
    })
  }

  const handleDete = () => {
    setInputs({ ...inputs, file: '', urlForPreview: null })
  }

  //will update posts data array to render the post without any request
  const updateData = (post) => {
    const oldArray = [...data]
    oldArray.unshift(post)
    setData(oldArray)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const data = new FormData()
      data.append('file', inputs.file)
      data.append('text', inputs.text)

      const response = await fetch('http://localhost:3000/api/posts/upload', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      if (response.ok) {
        setInputs({
          text: '',
          file: '',
          urlForPreview: null,
        })
        setOpen(true)
      }
      const parsedRespose = await response.json()
      updateData(parsedRespose.post)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const ImgPreview = () => {
    if (inputs.urlForPreview) {
      return (
        <div className="img_container">
          <img src={inputs.urlForPreview} alt="preview" />
        </div>
      )
    }
  }

  return (
    <>
      <Accordion
        className="accordion"
        expanded={expanded === 'panel1'}
        onChange={handleChangeAccordion('panel1')}
      >
        <AccordionSummary
          className="accordion__summary"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Button className="accordion__btn" fullWidth variant="outlined">
            Créer une publication
          </Button>
        </AccordionSummary>

        <AccordionDetails className="accordion__content">
          <form onSubmit={handleSubmit}>
            <Typography component="label" variant="overline" htmlFor="text">
              Une anecdote ? Une info à partager ? Une photo ? C'est par ici !
            </Typography>
            <TextareaAutosize
              className="bio__input"
              required
              minRows={7}
              maxRows={20}
              name="text"
              aria-label="saisie du contenu textuel"
              value={inputs.text}
              onChange={handleText}
              placeholder="Ecrivez quelque chose"
            />
            <ImgPreview />

            {error && (
              <Typography component="span" variant="button" color="error.light">
                {error}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" flexWrap="wrap" gap={1}>
              <label htmlFor="file">
                <Input
                  sx={{ display: 'none' }}
                  className="upload__input"
                  accept="image/*"
                  id="file"
                  type="file"
                  onChange={handleFile}
                />
                <Button variant="outlined" component="span">
                  Image
                  <PhotoCamera className="upload__icon" />
                </Button>
              </label>
              {inputs.urlForPreview && (
                <Button variant="outlined" color="error" onClick={handleDete}>
                  Supprimer <PhotoCamera className="upload__icon" />
                </Button>
              )}

              <Button
                variant="contained"
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <CircularProgress size={'1.7em'} />
                ) : (
                  <>
                    Publier <SendIcon className="upload__icon" />
                  </>
                )}
              </Button>
            </Stack>
          </form>
        </AccordionDetails>
      </Accordion>
      <SuccessAlert
        open={open}
        message="Publication enregistrée"
        handleClose={handleClose}
        type="success"
      />
    </>
  )
}

export default CreatePost
