import React, { useState } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

function SuccessAlert({ message, open, handleClose }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default SuccessAlert