import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useContext, useState } from 'react'
import {
  PostsContext,
  UserContext,
  AlertContext,
} from '../../utils/context/context'
import DeleteIcon from '@mui/icons-material/Delete'

function DeletePost({ post }) {
  const { data, setData } = useContext(PostsContext)
  const { setAlertStates } = useContext(AlertContext)
  const { user } = useContext(UserContext)
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState()

  //Update data state to delete the post from the DOM
  const updateDom = () => {
    const oldData = [...data]
    const newData = oldData.filter((p) => p.id !== post.id)
    setData(newData)
  }

  //Delete API request
  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}posts/${post.id}`,
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
          message: 'Publication supprimée !',
        })
        updateDom()
      } else {
        setError(parsedRes.message)
        setAlertStates({
          open: true,
          type: 'error',
          message: parsedRes.message,
        })
      }
    } catch (error) {
      setError(error.message)
      console.log(error)
      setAlertStates({
        open: true,
        type: 'error',
        message: error.message,
      })
    }
  }

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
