import {
  Button,
  CardContent,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useState } from 'react'
import { UserContext } from '../../utils/context/context'
import FeedBackAlert from '../Alert/FeedBackAlert'

function CreateComment({ postId }) {
  const { user } = useContext(UserContext)
  const [input, setInput] = useState()
  const [loading, setLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [error, setError] = useState(false)

  //post Request
  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const res = await fetch(`http://localhost:3000/api/comment`, {
        method: 'POST',

        body: JSON.stringify({ postId, text: input }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRes = await res.json()

      if (res.ok) {
        setInput('')
        setOpenAlert(true)
      } else {
        setError()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CardContent>
        <TextareaAutosize
          className="bio__input"
          required
          minRows={2}
          maxRows={20}
          name="text"
          aria-label="saisie du contenu textuel"
          placeholder="Réagissez à cette publication ici"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </CardContent>

      <Button onClick={handleSubmit} style={{ margin: '1em' }} type="submit">
        {loading ? (
          <CircularProgress size={'1.7em'} />
        ) : (
          <>
            Publier <SendIcon className="upload__icon" />
          </>
        )}
      </Button>
      <FeedBackAlert
        message="Enregistré !"
        open={openAlert}
        setOpenState={setOpenAlert}
        type="success"
      />
    </>
  )
}

export default CreateComment
