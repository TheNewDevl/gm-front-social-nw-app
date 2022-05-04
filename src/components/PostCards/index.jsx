import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { Input } from '@mui/material'
import { IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

function PostCard() {
  const { user } = useContext(UserContext)
  const [text, setText] = useState('')
  const [file, setFile] = useState('')

  //handleChanges
  const handleText = (e) => {
    setText(e.target.value)
  }
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = new FormData()
      data.append('file', file)
      data.append('text', JSON.stringify(text))

      const response = await fetch('http://localhost:3000/posts/upload', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(response)
      const parsedRespose = await response.json()
      console.log(parsedRespose)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Publiez du contenu
        </Typography>

        <TextField fullWidth></TextField>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="medium">
          Partager
        </Button>
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" component="span">
            Upload
            <PhotoCamera />
          </Button>
          <Input accept="image/*" id="contained-button-file" type="file" />
        </label>
      </CardActions>
    </Card>
  )
}

export default PostCard
