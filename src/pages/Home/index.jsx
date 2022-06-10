import { Divider, Grid, Typography } from '@mui/material'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import './Home.scss'

function Home() {
  return (
    <main className="main">
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
    </main>
  )
}

export default Home
