import {
  Button,
  CardContent,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useState } from 'react'
import { AlertContext, UserContext } from '../../utils/context/UserContext'

function CreateComment({ post, dataComment, setDataComment }) {
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)
  const [input, setInput] = useState()
  const [loading, setLoading] = useState(false)

  const [, /* error */ setError] = useState(false)

  //will update comments state array to render the new comment
  const updateDom = (newComment) => {
    const oldArray = [...dataComment]
    oldArray.unshift(newComment)
    setDataComment(oldArray)
    post.commentsCount += 1
  }

  //post Request
  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const res = await fetch(
        process.env.REACT_APP_LOCALIP_URL_API + 'comment',
        {
          method: 'POST',

          body: JSON.stringify({ postId: post.id, text: input }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      const parsedRes = await res.json()

      if (res.ok) {
        setInput('')
        setAlertStates({
          open: true,
          type: 'success',
          message: 'Enregistré !',
        })
        updateDom(parsedRes)
      } else {
        setError(parsedRes.message)
        setAlertStates({
          open: true,
          type: 'error',
          message: `${parsedRes.message}`,
        })
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
      setAlertStates({
        open: true,
        type: 'error',
        message: { error },
      })
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

      <Button
        onClick={handleSubmit}
        style={{ marginLeft: '1em', marginTop: '-1.5em' }}
        type="submit"
      >
        {loading ? (
          <CircularProgress size={'1.7em'} />
        ) : (
          <>
            Publier <SendIcon className="upload__icon" />
          </>
        )}
      </Button>
    </>
  )
}

export default CreateComment
