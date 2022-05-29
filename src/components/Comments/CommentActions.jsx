import {
  Button,
  CardContent,
  CircularProgress,
  Dialog,
  TextareaAutosize,
} from '@mui/material'
import { useContext, useState } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { PostsContext } from '../../utils/context/PostsContext'
import { UserContext } from '../../utils/context/UserContext'
import { DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send'

function CommentActions({ comments, setDataComment, comment, userId }) {
  const { user } = useContext(UserContext)
  const { data } = useContext(PostsContext)
  const { setAlertStates } = useContext(AlertContext)
  const [error, setError] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [input, setInput] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (comment) setInput(comment.text)
  }, [])

  //update posts state to synchronize display and avoid a relaod
  const updateDom = (updatedComment) => {
    const oldData = [...comments]
    //find the index of the post
    const index = oldData.findIndex((c) => c.id === comment.id)
    oldData[index].text = updatedComment.text
    setDataComment(oldData)
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}comment/${comment.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ text: input }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      let parsedRes = await response.json()
      if (response.ok) {
        setOpenDialog(false)
        setAlertStates({
          open: true,
          type: 'success',
          message: 'Modification enregistrée !',
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
    } catch (e) {
      setError(e.message)
      setAlertStates({
        open: true,
        type: 'error',
        message: { error },
      })
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDom = async () => {
    const oldData = [...comments]
    const newData = oldData.filter((c) => c.id !== comment.id)
    setDataComment(newData)
    // retrive index to update the post commments counter
    const index = data.findIndex((p) => p.id === comment.post.id)
    data[index].commentsCount -= 1
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}comment/${comment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      let parsedRes = await response.json()
      if (response.ok) {
        setAlertStates({
          open: true,
          type: 'success',
          message: 'Ok, Commentaire supprimé !',
        })
        deleteDom()
      } else {
        setError(parsedRes.message)
        setAlertStates({
          open: true,
          type: 'error',
          message: `${parsedRes.message}`,
        })
      }
    } catch (e) {
      setError(e.message)
      setAlertStates({
        open: true,
        type: 'success',
        message: { error },
      })
      console.log(e)
    }
  }

  if (user.user.id === userId || user.user.roles === 'admin') {
    return (
      <>
        <Button onClick={() => setOpenDialog(true)} size="small">
          Modifier
        </Button>
        <Button onClick={handleDelete} color="error" size="small">
          Supprimer
        </Button>
        <div>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Modification</DialogTitle>
            <DialogContent>
              <CardContent>
                <TextareaAutosize
                  className="bio__input"
                  required
                  minRows={2}
                  maxRows={20}
                  name="text"
                  aria-label="saisie du contenu textuel"
                  value={input}
                  onChange={(e) => setInput(e.currentTarget.value)}
                />
              </CardContent>

              <Button
                onClick={handleUpdate}
                style={{ marginLeft: '1em', marginTop: '-1.5em' }}
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={'1.7em'} />
                ) : (
                  <>
                    Publier <SendIcon className="upload__icon" />
                  </>
                )}
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}

export default CommentActions
