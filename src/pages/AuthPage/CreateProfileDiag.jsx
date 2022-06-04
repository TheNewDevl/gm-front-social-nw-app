import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import useLogout from '../../utils/hooks/useLogout'

const CreateProfileDiag = ({ open }) => {
  const logout = useLogout()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Dialog
      open={open}
      sx={{ textAlign: 'center' }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Complétez votre profil'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Votre compte a été créé ! Plus qu'une toute petite étape : <br />
          Complétez votre profil afin de pouvoir accéder à toutes les
          fonctionnalitées.
        </DialogContentText>

        <ProfileForm method={'POST'} />
        <br />
        <Typography
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          role="button"
          component="p"
          variant="overline"
          onClick={handleLogout}
        >
          Completer plus tard
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

CreateProfileDiag.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default CreateProfileDiag
