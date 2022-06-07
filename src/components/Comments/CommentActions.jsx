import { Button, Dialog } from '@mui/material'
import { useContext, useState } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { PostsContext } from '../../utils/context/PostsContext'
import { UserContext } from '../../utils/context/UserContext'
import { DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { useEffect } from 'react'
import CommentForm from './CommentForm'
import { RequestsContext } from '../../utils/context/RequestsContext'
import { isNotEmpty } from 'class-validator'

function CommentActions({ comments, setDataComment, comment, userId }) {
  const { user } = useContext(UserContext)
  const { data } = useContext(PostsContext)
  const { setAlertStates } = useContext(AlertContext)
  const [error, setError] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [input, setInput] = useState()
  const {
    requestData,
    requestError,
    setRequestError,
    makeRequest,
    setRequestData,
  } = useContext(RequestsContext)

  //will display initial comment value when update
  useEffect(() => {
    if (comment) setInput(comment.text)
  }, [comment])

  //catch request errors and use it
  useEffect(() => {
    requestError && setError(requestError)
    return () => setRequestError('')
  }, [requestError, setRequestError])

  // will catch the updated comment and update DOM
  useEffect(() => {
    //update posts state to synchronize display and avoid a relaod
    const updateDom = (updatedComment) => {
      const oldData = [...comments]
      //find the index of the post
      const index = oldData.findIndex((c) => c.id === updatedComment.id)
      oldData[index].text = updatedComment.text
      setDataComment(oldData)
    }
    if (requestData?.updatedComment) {
      updateDom(requestData.updatedComment)
    }
    //clean requestData
    setRequestData('')
  }, [requestData, comments, setDataComment, setRequestData])

  //input validation
  const validation = (input) => {
    if (!input || !isNotEmpty(input)) {
      setError('Votre commentaire ne peut pas être vide')
      throw new Error('Votre commentaire ne peut pas être vide')
    } else {
      setError('')
    }
  }

  const handleUpdate = async (e) => {
    try {
      e.preventDefault()
      validation(input)

      const uri = `comment/${comment.id}`
      const method = 'patch'
      const data = { text: input }
      await makeRequest(method, uri, data)

      setAlertStates({
        open: true,
        type: 'success',
        message: 'Modification enregistrée !',
      })
      setOpenDialog(false)
    } catch (err) {
      setAlertStates({
        open: true,
        type: 'error',
        message: `${err}`,
      })
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

  const handleDelete = async (e) => {
    try {
      const uri = `comment/${comment.id}`
      const method = 'delete'
      await makeRequest(method, uri)
      deleteDom()
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Commentaire supprimé !',
      })
    } catch (err) {
      setAlertStates({ open: true, type: 'error', message: `${err}` })
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
          <Dialog
            fullWidth
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <DialogTitle>Modification</DialogTitle>
            <DialogContent>
              <CommentForm
                handleSubmit={handleUpdate}
                input={input}
                setInput={setInput}
                textError={error}
              />
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
