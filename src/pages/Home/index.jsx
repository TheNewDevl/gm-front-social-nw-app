import { Grid, Typography } from '@mui/material'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import Main from '../../Layout/Main'

function Home() {
  return (
    <Main>
      <Grid>
        <Typography
          component="h1"
          variant="overline"
          fontSize="1.5em"
          fontWeight="900"
          textAlign="center"
          color="primary"
        >
          Publications
        </Typography>
        <CreatePost />

        <PostsDisplay />
      </Grid>
    </Main>
  )
}

export default Home
