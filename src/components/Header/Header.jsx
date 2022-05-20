import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { AppBar, Tab, Tabs } from '@mui/material'
import LogoPng from '../../assets/icon-left-font-monochrome-white.svg'
import { UserContext } from '../../utils/context/context'
import { useFetch } from '../../utils/hooks/custom.hooks'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import './Header.scss'

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  //////
  const { user, hasProfile, setUser } = React.useContext(UserContext)
  const uri = user ? `profile/${user.user.id}` : 'profile'
  const { data, isLoading, error } = useFetch(uri)

  /** uniquement pour le nav */

  return (
    <React.Fragment>
      <AppBar sx={{ height: '50px' }} position="sticky">
        <Box className="container">
          <img className="logo" src={LogoPng} alt="Logo Groupomania" />

          {/* ///////////NAV////////// */}
          {(user && user.user.hasProfile === 1) ||
          (user && hasProfile === '1') ? (
            error ? (
              <span>Une erreur s'est produite</span>
            ) : isLoading ? (
              <Loader
                style={{
                  margin: 'initial',
                  marginRight: '1em',
                  borderWidth: '2px',
                }}
                color="white"
              />
            ) : (
              <Box
                component="nav"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tab
                  component={Link}
                  textColor="#fff"
                  sx={{ p: 0, mr: '-30px' }}
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
                      src={data && data.photo}
                      alt="Photo de profil"
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          ) : null}

          {/* /////////MENU////////// */}
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
            <MenuItem component={Link} to="/profile/interactions">
              <Avatar src={data && data.photo} alt="Photo de profil" /> Mes
              interactions
            </MenuItem>
            <MenuItem component={Link} to="/profile">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Mon Profil
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
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Se deconnecter
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
