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
import { postValidation } from '../../utils/validators'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function UpdatePost({ post }) {
  const { setAlertStates } = useContext(AlertContext)
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const secureAxios = useSecureAxios()

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

  const validation = (inputs) => {
    const formError = postValidation(inputs)
    setError(formError.text)
    if (formError.text) {
      throw new Error(formError.text)
    }
  }

  //update posts state to synchronize display and avoid a relaod
  const updateDom = (updatedPost) => {
    const oldData = [...data]
    //find the index of the post
    const index = oldData.findIndex((p) => p.id === updatedPost.id)
    oldData[index].text = updatedPost.text
    oldData[index].image = updatedPost.image
    setData(oldData)
  }

  //update Request
  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      validation(updateInputs)

      const data = new FormData()
      data.append('file', updateInputs.file)
      data.append('text', updateInputs.text)

      const response = await secureAxios.patch(`posts/${post.id}`, data)
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Modifications enregistrées !',
      })
      setUpdateInputs({ text: '', file: '', urlForPreview: null })
      setOpenDialog(false)
      updateDom(response.data)
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  //catch request errors and use it
  useEffect(() => {
    if (error) {
      setAlertStates({ open: true, type: 'error', message: `${error}` })
    }
  }, [error])

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
