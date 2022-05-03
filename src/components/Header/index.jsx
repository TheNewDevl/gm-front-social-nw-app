import { HeaderWrapper, StyledLink, Logo } from './header.style'
import LogoPng from '../../assets/icon.png'
import { AppBar, Tabs, Tab, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'

function Header() {
  const { user, setUser } = useContext(UserContext)

  return (
    <AppBar position="sticky">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo src={LogoPng} alt="Logo" />

        <Tabs value={false}>
          <Tab component={Link} to="/home" label="Accueil" />
          <Tab component={Link} to="/profile" label="Mon profil" />
          {/* Display dashboard link for admin users */}
          {user.role === 'admin' && (
            <Tab component={Link} to="/dashboard" label="Dashboard" />
          )}
          <Tab
            component={Link}
            to="/"
            label="Se deconnecter"
            onClick={() => {
              setUser(null)
              sessionStorage.clear()
            }}
          />
        </Tabs>
      </Box>
    </AppBar>

    /*  <HeaderWrapper>
      <div>
        <Logo src={LogoPng} alt="Logo" />
      </div>
      <nav>
        <StyledLink to="/posts">Accueil </StyledLink>
        <StyledLink to="/profile">Mon profil </StyledLink>
        <StyledLink to="/">Se deconnecter </StyledLink>
      </nav>
    </HeaderWrapper> */
  )
}

export default Header
