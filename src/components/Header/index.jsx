import { HeaderWrapper, StyledLink, Logo } from './header.style'
import LogoPng from '../../assets/icon.png'

function Header() {
  return (
    <HeaderWrapper>
      <div>
        <Logo src={LogoPng} alt="Logo" />
      </div>
      <nav>
        <StyledLink to="/posts">Accueil </StyledLink>
        <StyledLink to="/profil">Mon profil </StyledLink>
        <StyledLink to="/">Se deconnecter </StyledLink>
      </nav>
    </HeaderWrapper>
  )
}

export default Header
