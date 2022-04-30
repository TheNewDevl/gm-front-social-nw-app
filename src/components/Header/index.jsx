import { HeaderWrapper, StyledLink, Logo } from './header.style'
import LogoPng from '../../assets/icon.png'
import { AppBar, Tabs, TabScrollButton, Tab, Box } from '@mui/material'
import { Navigation } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Header({ setUser }) {
  return (
    <AppBar position="sticky">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo src={LogoPng} alt="Logo" />

        <Tabs value={false}>
          <Tab component={Link} to="/posts" label="Accueil" />
          <Tab component={Link} to="/profile" label="Mon profil" />
          <Tab
            component={Link}
            to="/"
            label="Se deconnecter"
            onClick={() => setUser(null)}
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
