import { Fragment } from 'react'
import { AppBar } from '@mui/material'
import LogoPng from '../../assets/icon-left-font-monochrome-white.svg'
import BarContainer from '../../Layout/BarContainer'
import HeaderMenu from '../HeaderMenu/HeaderMenu'

function Header() {
  return (
    <Fragment>
      <AppBar sx={{ height: '50px' }} position="sticky">
        <BarContainer>
          <img
            style={{ height: '30px', maxWidth: '50%' }}
            src={LogoPng}
            alt="Logo Groupomania"
          />
          {/* Custom menu so it will only be displayed if user is logged with a complete profile */}
          <HeaderMenu />
        </BarContainer>
      </AppBar>
    </Fragment>
  )
}

export default Header
