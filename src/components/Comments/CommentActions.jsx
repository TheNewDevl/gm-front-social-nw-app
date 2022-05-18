import { Button } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'

function CommentActions({ userID }) {
  const { user } = useContext(UserContext)
  if (user.user.id === userID || user.user.roles === 'admin') {
    return (
      <>
        <Button size="small">Modifier</Button>
        <Button color="error" size="small">
          Supprimer
        </Button>
      </>
    )
  }
}

export default CommentActions
