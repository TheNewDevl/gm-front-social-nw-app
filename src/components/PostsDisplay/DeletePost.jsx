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
import { UserContext } from '../../utils/context/context'
import DeleteIcon from '@mui/icons-material/Delete'
import FeedBackAlert from '../Alert/FeedBackAlert'

function DeletePost({ post, data, setData, alertStatus }) {
  const { user } = useContext(UserContext)
  const [openPopUp, setOpenPopUp] = useState(false)
  const [error, setError] = useState()

  const [openAlert, setOpenAlert] = useState(false)

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
        `http://localhost:3000/api/posts/${post.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      let parsedRes = await response.json()
      if (response.ok) {
        alertStatus(true)
        updateDom()
      } else {
        setError(parsedRes.message)
        setOpenAlert(true)
      }
    } catch (error) {
      console.log(error)
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

        <FeedBackAlert
          message={error}
          open={openAlert}
          setOpenState={setOpenAlert}
          type="error"
        />
      </>
    )
  }
}

export default DeletePost
