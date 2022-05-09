import { Grid } from '@mui/material'
import CreatePost from '../../components/CreatePostCard'
import PostCard from '../../components/PostCard'
import './Home.scss'
function Home() {
  return (
    <main className="main">
      <h1> réseau !</h1>
      <Grid container>
        <Grid item xs={12} sm={8} md={6}>
          <CreatePost />
          <PostCard />
        </Grid>
      </Grid>
    </main>
  )
}

export default Home
