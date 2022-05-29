import AccountDetails from './AccountDetails'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import { UserContext } from '../../utils/context/UserContext'
import { useContext, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

function Account() {
  const { user } = useContext(UserContext)
  const [display, setDisplay] = useState('profile')

  const handleClick = (e) => {
    setDisplay(e.currentTarget.value)
  }

  return (
    <main className="main">
      {/*  <MainTitle>Mon Profil</MainTitle> */}

      <ToggleButtonGroup color="primary" fullWidth value={display} exclusive>
        <ToggleButton onClick={handleClick} size="large" value="profile">
          Mon profil
        </ToggleButton>
        <ToggleButton onClick={handleClick} value="account">
          Mon compte
        </ToggleButton>
      </ToggleButtonGroup>

      {display === 'profile' ? (
        <ProfileForm method="PATCH" uri={user.user.id} />
      ) : (
        <AccountDetails />
      )}
    </main>
  )
}

export default Account
