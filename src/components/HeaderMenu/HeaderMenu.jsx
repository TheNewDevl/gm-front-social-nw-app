import { useContext, useEffect, useState } from 'react'
import { Settings, Logout } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import {
  Tab,
  Avatar,
  IconButton,
  Box,
  useTheme,
  Typography,
  Tooltip,
  MenuItem,
  ListItemIcon,
  Divider,
  Menu,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { UserContext } from '../../utils/context/UserContext'
import { useFetch } from '../../utils/hooks/custom.hooks'
import Loader from '../Loader/Loader'
import useLogout from '../../utils/hooks/useLogout'

const HeaderMenu = () => {
  const logout = useLogout()
  const theme = useTheme()
  const { user, hasProfile } = useContext(UserContext)
  const [uri, seturi] = useState('profile')
  const [loged, setLoged] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
  }

  const { data, isLoading, error } = useFetch(uri)

  useEffect(() => {
    if (user?.user?.hasProfile === 1 || (user && hasProfile === '1')) {
      seturi(`profile/${user.user.id}`)
      setLoged(true)
    }
  }, [user, hasProfile])

  if (loged && user) {
    return (
      <>
        {error ? (
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
          <>
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
                sx={{
                  p: 0,
                  mr: '-30px',
                  [theme.breakpoints.up('sm')]: { mr: '0px' },
                  ...theme.headerTabsHover,
                }}
                to="/"
                title="Accueil"
                role="link"
                label={
                  <>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        [theme.breakpoints.down('sm')]: {
                          display: 'none',
                        },
                      }}
                      role="link"
                    >
                      Publications
                    </Typography>
                    <HomeIcon
                      sx={{
                        [theme.breakpoints.up('sm')]: { display: 'none' },
                      }}
                      fontSize="large"
                    />
                  </>
                }
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

              <MenuItem component={Link} to="/auth" onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Se deconnecter
              </MenuItem>
            </Menu>
          </>
        )}
      </>
    )
  }
}

export default HeaderMenu
