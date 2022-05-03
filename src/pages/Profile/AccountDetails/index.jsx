import {
  AccoutInfoCard,
  AccountImage,
  AccountActions,
  ActionLink,
  InfoWrapper,
  InfoHeader,
  InfoDetails,
  CardTitle,
} from '../AccountCard/profile.style'
import { TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../utils/context/context'

import { Default } from 'react'

function AccountDetails({ profile }) {
  const { user, setUser } = useContext(UserContext)

  const createdAt = new Date(user.result.createdAt)

  return (
    <InfoWrapper>
      <InfoHeader>
        <h2>{profile.name}</h2>
        <AccountImage src={profile.avatar} alt="Avatar" />
      </InfoHeader>
      <InfoDetails>
        <p>Username : {profile.username}</p>
        <p>Email : {user.result.email}</p>
        <TextField
          size="small"
          variant="standard"
          margin="normal"
          id={user.result.email}
          value="teet"
          name={user.result.email}
          type={'email'}
          autoComplete="off"
        />
        <p>Inscrit depuis le {createdAt.toLocaleDateString()}</p>
        <p>A propos de moi : {profile.createdAt}</p>
      </InfoDetails>
    </InfoWrapper>
  )
}

export default AccountDetails
