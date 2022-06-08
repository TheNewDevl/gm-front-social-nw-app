import { useContext, useEffect, useState, forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import DataTable from '../DataTable/DataTable'
import timeManagement from '../../utils/time-management'
import { Avatar, Button } from '@mui/material'
import Loader from '../Loader/Loader'
import { RequestsContext } from '../../utils/context/RequestsContext'
import { useNavigate } from 'react-router-dom'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ProfilesDiag({ open, handleClose, userId }) {
  const { useGetData } = useContext(RequestsContext)
  const { data, isLoading, error } = useGetData(`profile/${userId}`)

  const [profileInfos, setProfileInfos] = useState()
  useEffect(() => {
    if (data) {
      setProfileInfos([
        { label: "Nom d'utilisateur", value: data.user.username },
        { label: 'Prénom', value: data.firstName },
        { label: 'Nom', value: data.firstName },
        { label: 'A propos', value: data.bio },
        { label: 'Inscrit depuis ', value: timeManagement(data.createdAt) },
        {
          label: 'Nombre de Publications ',
          value: data.user.posts.length,
        },
      ])
    }
  }, [data])

  const navigate = useNavigate()
  const handleRedirection = (e) => {
    navigate(`/publications/${userId}/${data.user.username}`, { replace: true })
  }

  if (data)
    return (
      <div>
        <Dialog
          fullScreen
          sx={{ maxWidth: '1200px', margin: 'auto' }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{
              position: 'relative',
              height: '50px',
            }}
          >
            <Toolbar
              variant="dense"
              sx={{
                minHeight: '50px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {isLoading && <Loader />}
          {error && (
            <Typography component="span" variant="subtitle1">
              Une erreur s'est produite
            </Typography>
          )}
          <Avatar
            sx={{
              margin: '1em auto',
              width: 200,
              height: 200,
            }}
            src={data.photo && data.photo}
            alt={`photo de profil de ${data.user.username}`}
          />

          {profileInfos && <DataTable displayData={profileInfos} />}
          <Button
            onClick={handleRedirection}
            sx={{ m: '1em' }}
            variant="contained"
            role="link"
          >
            Consulter les publications
          </Button>
        </Dialog>
      </div>
    )
}
