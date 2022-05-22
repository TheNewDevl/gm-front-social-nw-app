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
import {
  AlertContext,
  PostsContext,
  UserContext,
} from '../../utils/context/context'
import PostForm from '../PostForm/PostForm'

function UpdatePost({ post }) {
  const { setAlertStates } = useContext(AlertContext)
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)

  const [openDialog, setOpenDialog] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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

  //update Request
  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const data = new FormData()
      data.append('file', updateInputs.file)
      data.append('text', updateInputs.text)
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}posts/${post.id}`,
        {
          method: 'PATCH',
          body: data,
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      const updatedPost = await response.json()

      if (response.ok) {
        setUpdateInputs({
          text: '',
          file: '',
          urlForPreview: null,
        })
        setOpenDialog(false)
        setAlertStates({
          open: true,
          type: 'success',
          message: 'Modifications enregistrées !',
        })
        updateDom(updatedPost)
      } else {
        setError(updatedPost.message)
        setAlertStates({
          open: true,
          type: 'error',
          message: `${updatedPost.message}`,
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

  //update posts state to synchronize display and avoid a relaod
  const updateDom = (updatedPost) => {
    const oldData = [...data]
    //find the index of the post
    const index = oldData.findIndex((p) => p.id === post.id)
    oldData[index].text = updatedPost.text
    oldData[index].image = updatedPost.image
    setData(oldData)
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
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Modification du post</DialogTitle>
            <DialogContent>
              <PostForm
                inputs={updateInputs}
                setInputs={setUpdateInputs}
                error={error}
                handleSubmit={handleSubmit}
                loading={loading}
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
