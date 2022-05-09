import LogoPng from '../../assets/icon-left-font-monochrome-white.svg'
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Tooltip,
  Avatar,
  IconButton,
  MenuItem,
  ListItemIcon,
  Divider,
  Menu,
} from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../../utils/context/context'
import './Header.scss'
import HomeIcon from '@mui/icons-material/Home'
import Loader from '../../components/Loader/Loader'
import { useFetch } from '../../utils/hooks/custom.hooks'

function Header() {
  const { user, hasProfile, setUser } = useContext(UserContext)

  //This component returns the deployable menu
  const HeaderMenu = ({ handleClose, open, anchorEl }) => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/profile">
          <Avatar /> Mon Profil
        </MenuItem>
        <MenuItem>
          <Avatar /> Mon compte
        </MenuItem>

        <MenuItem>
          <Avatar /> Mes interactions
        </MenuItem>

        <Divider />

        <MenuItem
          component={Link}
          to="/auth"
          onClick={() => {
            setUser('')
            sessionStorage.clear()
          }}
        >
          {/* Display dashboard link for admin users */}
          {user.role === 'admin' && (
            <Tab component={Link} to="/dashboard" label="Dashboard" />
          )}
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Se deconnecter
        </MenuItem>
      </Menu>
    )
  }

  //custom navigation menu that will expand the menu and display the user's profile picture
  const HeaderNav = ({ id, token }) => {
    //custom menu states
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    //fetch call to retrive avatar url
    const { data, isLoading, error } = useFetch(`profile/${user.user.id}`)

    if (error) return <span>Une erreur s'est produite </span>

    return isLoading ? (
      <Loader />
    ) : (
      <>
        <Tabs value={false}>
          <Tab
            component={Link}
            to="/"
            title="Accueil"
            label={<HomeIcon className="HomeIcon" fontSize="large" />}
          />

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                src={data.photo}
                alt="Photo de profil"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Tabs>
        <HeaderMenu
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </>
    )
  }

  return (
    <>
      <AppBar position="sticky">
        <Box className="container">
          <img className="logo" src={LogoPng} alt="Logo Groupomania" />
          {(user && user.user.hasProfile === 1) || hasProfile === '1' ? (
            <HeaderNav token={user.user.token} id={user.user.id} />
          ) : null}
        </Box>
      </AppBar>
    </>
  )
}

export default Header
