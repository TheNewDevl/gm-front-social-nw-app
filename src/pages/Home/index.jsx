import { Grid } from '@mui/material'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import './Home.scss'

function Home() {
  return (
    <main className="main">
      <Grid>
        <CreatePost />
        <PostsDisplay />
      </Grid>
    </main>
  )
}

export default Home
