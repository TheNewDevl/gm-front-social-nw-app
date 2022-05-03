import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from '@mui/material'

import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'

function PostCards({ content, media }) {
  const { user, setUser } = useContext(UserContext)
  return (
    <Card>
      <CardContent>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero illo
          itaque quas aspernatur adipisci facilis, dolore laudantium doloremque
          corporis iusto commodi facere, voluptatem cupiditate, autem ex
          inventore! Atque, cumque enim?
        </Typography>
        <Typography mt={3}>@username, le 01/01/2021</Typography>
      </CardContent>
      <TextField mt={5} />
      <CardActions>
        <Button>Commenter</Button>
        <Button>Like</Button>
        <Button color="error">Supprimer</Button>
      </CardActions>
    </Card>
  )
}

export default PostCards
