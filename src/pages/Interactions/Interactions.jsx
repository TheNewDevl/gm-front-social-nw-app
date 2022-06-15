import { useContext, useState } from 'react'
import { UserContext } from '../../utils/context/UserContext'
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
} from '@mui/material'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import Main from '../../Layout/Main'

function Interactions() {
  const { user } = useContext(UserContext)
  const [display, setDisplay] = useState('interactions')

  const handleClick = (e) => {
    setDisplay(e.currentTarget.value)
  }

  return (
    <Main>
      <ToggleButtonGroup color="primary" fullWidth value={display} exclusive>
        <ToggleButton onClick={handleClick} size="large" value="interactions">
          Mes publications
        </ToggleButton>
        <ToggleButton onClick={handleClick} value="account">
          Mes commentaires
        </ToggleButton>
      </ToggleButtonGroup>

      {display === 'interactions' ? (
        <div>
          <Typography
            component="h1"
            variant="overline"
            fontSize="1.5em"
            fontWeight="900"
            margin="1em"
            textAlign="center"
            color="primary"
          >
            Mes publications
          </Typography>
          <Divider sx={{ mb: '2em' }} />
          <PostsDisplay id={user.user.id} />
        </div>
      ) : (
        <div>
          <Typography
            component="h1"
            variant="overline"
            fontSize="1.5em"
            fontWeight="900"
            margin="1em"
            textAlign="center"
            color="primary"
          >
            Mes commentaires
          </Typography>
          <Divider sx={{ mb: '2em' }} />
          <p>En cours de déployement</p>
        </div>
      )}
    </Main>
  )
}
export default Interactions
