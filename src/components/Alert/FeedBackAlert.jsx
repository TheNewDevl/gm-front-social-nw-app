import React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

function FeedBackAlert({ message, setOpenState, open, type }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  //handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenState(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default FeedBackAlert
