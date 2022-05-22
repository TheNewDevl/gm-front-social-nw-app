import {
  Typography,
  Button,
  TextareaAutosize,
  Stack,
  CircularProgress,
} from '@mui/material'
import React from 'react'
import { PhotoCamera } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'

function PostForm({ inputs, setInputs, error, handleSubmit, loading }) {
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
    <form onSubmit={handleSubmit}>
      <Typography component="label" variant="overline" htmlFor="text">
        Une anecdote ? Une info à partager ? Une photo ? C'est par ici !
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
      </Typography>
      <ImgPreview />

      {error && (
        <Typography component="span" variant="button" color="error.light">
          {error}
        </Typography>
      )}

      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={1}>
        <label htmlFor="file">
          <Button variant="outlined" component="label">
            Image
            <PhotoCamera className="upload__icon" />
            <input
              className="upload__input"
              accept="image/*"
              id="file"
              type="file"
              onChange={handleFile}
              hidden
            />
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
  )
}

export default PostForm
