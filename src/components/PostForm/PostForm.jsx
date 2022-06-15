import {
  Typography,
  Button,
  Stack,
  CircularProgress,
  TextField,
  CardMedia,
  Box,
} from '@mui/material'
import React from 'react'
import { PhotoCamera } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'

function PostForm({ inputs, setInputs, error, handleSubmit, loading }) {
  //Set states for api Request
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
        <Box
          width="100%"
          maxHeight="40vh"
          margin="1em auto"
          display="flex"
          className="img_container"
        >
          <CardMedia
            component="img"
            image={inputs.urlForPreview}
            alt="Paella dish"
          />
          <CardMedia image={inputs.urlForPreview} src={inputs.urlForPreview} />
        </Box>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        multiline
        minRows={5}
        maxRows={10}
        name="text"
        aria-label="saisie du contenu textuel"
        type="text"
        value={inputs.text}
        onChange={handleText}
        label="Une anecdote ? Une info à partager ? Une photo ? C'est par ici !"
        fullWidth
        variant="outlined"
        margin="normal"
        error={error ? true : false}
      />

      <ImgPreview />

      {error && (
        <Typography component="span" variant="button" color="error.light">
          {error}
        </Typography>
      )}
      <Stack
        mt="1em"
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap={1}
      >
        <label htmlFor="file">
          <Button variant="outlined" component="label">
            Image
            <PhotoCamera sx={{ ml: '1em' }} />
            <input
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
            Supprimer
            <PhotoCamera sx={{ ml: '1em' }} />
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
              Publier <SendIcon sx={{ ml: '1em' }} />
            </>
          )}
        </Button>
      </Stack>
    </form>
  )
}

export default PostForm
