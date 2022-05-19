import React, { useContext } from 'react'
import { Slide, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { AlertContext } from '../../utils/context/context'

//slide transition component
function TransitionLeft(props) {
  return <Slide {...props} direction="right" />
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function FeedBackAlert() {
  const { alertStates, setAlertStates } = useContext(AlertContext)

  //handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertStates({
      ...alertStates,
      open: false,
    })
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={alertStates.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={handleClose}
        severity={alertStates.type}
        sx={{ width: '100%' }}
      >
        {alertStates.message}
      </Alert>
    </Snackbar>
  )
}
export default FeedBackAlert
