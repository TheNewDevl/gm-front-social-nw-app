import AccountDetails from './AccountDetails'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import { UserContext } from '../../utils/context/UserContext'
import { useContext, useState } from 'react'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Main from '../../Layout/Main'

function Account() {
  const { user } = useContext(UserContext)
  const [display, setDisplay] = useState('profile')

  const handleClick = (e) => {
    setDisplay(e.currentTarget.value)
  }

  return (
    <Main>
      <ToggleButtonGroup color="primary" fullWidth value={display} exclusive>
        <ToggleButton onClick={handleClick} size="large" value="profile">
          Mon profil
        </ToggleButton>
        <ToggleButton onClick={handleClick} value="account">
          Mon compte
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography
        component="h1"
        variant="overline"
        fontSize="1.5em"
        fontWeight="900"
        textAlign="center"
        color="primary"
      >
        {display === 'profile'
          ? 'Mon Profil'
          : display === 'account' && 'Mon compte'}
      </Typography>

      {display === 'profile' ? (
        <ProfileForm method="PATCH" uri={user.user.id} />
      ) : (
        <AccountDetails />
      )}
    </Main>
  )
}

export default Account
