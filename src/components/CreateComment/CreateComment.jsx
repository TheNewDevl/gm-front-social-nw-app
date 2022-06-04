import {
  Button,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useState } from 'react'
import { UserContext } from '../../utils/context/UserContext'
import { AlertContext } from '../../utils/context/AlertContext'
import { isAlphanumeric } from 'class-validator'

function CreateComment({ post, dataComment, setDataComment }) {
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)
  const [input, setInput] = useState()
  const [loading, setLoading] = useState(false)
  const [textError, settextError] = useState()
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
    e.preventDefault()

    if (!input || !isAlphanumeric(input)) {
      settextError('Votre commentaire ne peut pas être vide')
      return
    } else {
      settextError('')
    }

    if (!textError) {
      try {
        setLoading(true)

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
  }

  return (
    <>
      <CardContent>
        <TextField
          id="standard-multiline-static"
          name="text"
          aria-label="saisie du contenu textuel"
          label="Réagissez à cette publication ici"
          required
          fullWidth
          minRows={2}
          maxRows={5}
          multiline
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          error={textError ? true : false}
        />
        <Typography component="span" variant="body2" color="error.light">
          {textError}
        </Typography>
      </CardContent>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          onClick={handleSubmit}
          sx={{ mr: '1.5em', mb: '1em' }}
          type="submit"
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
    </>
  )
}

export default CreateComment
