import { Typography, Divider } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import { PostsContext } from '../../utils/context/PostsContext'
import Main from '../../Layout/Main'

function OtherUserPosts() {
  const { id, username } = useParams()
  const { setData } = useContext(PostsContext)

  useEffect(() => {
    setData([])
  }, [])

  return (
    <Main>
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
          {`@${username}`}
        </Typography>
        <Divider sx={{ mb: '2em' }} />
        <PostsDisplay id={id} />
      </div>
    </Main>
  )
}
export default OtherUserPosts
