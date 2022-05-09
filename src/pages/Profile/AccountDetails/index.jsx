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
import { useFetch } from '../../../utils/hooks/custom.hooks'

function AccountDetails({ profile }) {
  const { user } = useContext(UserContext)
  const { data, isLoading, error } = useFetch(`profile/${user.user.id}`)
  console.log(data)
  /*  const createdAt = new Date(user.result.createdAt) */

  return (
    <InfoWrapper>
      {isLoading ? (
        <div>Is Loading...</div>
      ) : (
        <>
          <InfoHeader>
            <h2>{data.firstName}</h2>
            <AccountImage src={data.photo} alt="Avatar" />
          </InfoHeader>
          <InfoDetails>
            <p>Username : {user.user.username}</p>

            <p>Inscrit depuis le </p>
            <p>A propos de moi : {data.bio} </p>
          </InfoDetails>
        </>
      )}
    </InfoWrapper>
  )
}

export default AccountDetails
