import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useContext, useState, useEffect } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { PostsContext } from '../../utils/context/PostsContext'
import { UserContext } from '../../utils/context/UserContext'
import PostForm from '../PostForm/PostForm'
import { RequestsContext } from '../../utils/context/RequestsContext'
import { postValidation } from '../../utils/validators'

function UpdatePost({ post }) {
  const { setAlertStates } = useContext(AlertContext)
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)
  const {
    requestData,
    requestError,
    setRequestError,
    isLoading,
    makeRequest,
    setRequestData,
  } = useContext(RequestsContext)
  const [error, setError] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [updateInputs, setUpdateInputs] = useState({
    text: '',
    file: '',
    urlForPreview: null,
  })

  useEffect(() => {
    if (post)
      setUpdateInputs({
        text: post.text,
        file: '',
        urlForPreview: post.image,
      })
  }, [post])

  //if get a new post from request, updateDom and clean context
  useEffect(() => {
    //update posts state to synchronize display and avoid a relaod
    const updateDom = (updatedPost) => {
      const oldData = [...data]
      //find the index of the post
      const index = oldData.findIndex((p) => p.id === updatedPost.id)
      oldData[index].text = updatedPost.text
      oldData[index].image = updatedPost.image
      setData(oldData)
    }
    if (requestData && requestData.updatedPost) {
      updateDom(requestData.updatedPost)
    }
    return () => setRequestData('')
  }, [requestData, setRequestData, data, setData])

  //catch request errors and use it
  useEffect(() => {
    requestError && setError(requestError)
    return () => setRequestError(undefined)
  }, [requestError, setRequestError])

  const validation = (inputs) => {
    const formError = postValidation(inputs)
    setError(formError.text)
    if (formError.text) {
      throw new Error(formError.text)
    }
  }

  //update Request
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      validation(updateInputs)
      const data = new FormData()
      data.append('file', updateInputs.file)
      data.append('text', updateInputs.text)
      await makeRequest('patch', `posts/${post.id}`, data)

      setUpdateInputs({ text: '', file: '', urlForPreview: null })
      setOpenDialog(false)
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Modifications enregistrées !',
      })
    } catch (err) {
      setAlertStates({ open: true, type: 'error', message: `${err}` })
    }
  }

  if (user.user.id === post.user.id || user.user.roles === 'admin') {
    return (
      <>
        <IconButton
          aria-label="update post"
          onClick={() => setOpenDialog(true)}
        >
          <EditIcon />
        </IconButton>
        <div>
          <Dialog
            fullWidth
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <DialogTitle>Modification du post</DialogTitle>
            <DialogContent>
              <PostForm
                inputs={updateInputs}
                setInputs={setUpdateInputs}
                error={error}
                handleSubmit={handleSubmit}
                loading={isLoading}
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

export default UpdatePost
