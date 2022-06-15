import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { PostsContext } from '../../utils/context/PostsContext'
import { AlertContext } from '../../utils/context/AlertContext'
import DeleteIcon from '@mui/icons-material/Delete'
import { UserContext } from '../../utils/context/UserContext'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function DeletePost({ post }) {
  const { data, setData } = useContext(PostsContext)
  const { setAlertStates } = useContext(AlertContext)
  const [openPopUp, setOpenPopUp] = useState(false)
  const { user } = useContext(UserContext)
  const [error, setError] = useState()
  const secureAxios = useSecureAxios()

  //Update data state to delete the post from the DOM
  const updateDom = () => {
    const oldData = [...data]
    const newData = oldData.filter((p) => p.id !== post.id)
    setData(newData)
  }

  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      await secureAxios.delete(`posts/${post.id}`)
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Publication supprimée !',
      })
      updateDom()
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
    }
  }

  useEffect(() => {
    if (error) {
      setAlertStates({ open: true, type: 'error', message: `${error}` })
    }
  }, [error])

  if (user.user.id === post.user.id || user.user.roles === 'admin') {
    return (
      <>
        <IconButton onClick={() => setOpenPopUp(true)} aria-label="delete post">
          <DeleteIcon />
        </IconButton>
        <div>
          <Dialog
            open={openPopUp}
            onClose={() => setOpenPopUp(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Supprimer'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Vouslez-vous vraiment supprimer cette publication ? Cette action
                est définitive et irréversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPopUp(false)}>Annuler</Button>
              <Button color="error" onClick={handleDelete} autoFocus>
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}

export default DeletePost
