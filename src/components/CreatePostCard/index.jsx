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

function CreatePostCard() {
  const { user } = useContext(UserContext)
  const [text, setText] = useState('')
  const [file, setFile] = useState()

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

      const response = await fetch('http://localhost:3000/api/posts/upload', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRespose = await response.json()
      console.log(parsedRespose)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" rounded-lg p-10 shadow-lg hover:shadow-xl">
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          <input
            onChange={handleText}
            className="placeholder:italic placeholder:text-slate-400"
            placeholder="Ecrivez quelque chose"
            name="text"
            type="text"
            value={text}
          />
        </label>

        <label htmlFor="file">
          <input
            onChange={handleFile}
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
            type="file"
            name="file"
          />
        </label>

        <button type="submit">Partager</button>
      </form>
    </div>
  )
}

export default CreatePostCard
