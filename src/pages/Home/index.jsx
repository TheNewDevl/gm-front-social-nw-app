import Header from '../../components/Header'
import { Grid } from '@mui/material'
import CreatePost from '../../components/CreatePostCard'
import PostCard from '../../components/PostCard'
function Home() {
  return (
    <>
      <Header />
      <h1> réseau !</h1>

      <Grid container>
        <Grid item xs={12} sm={8} md={6}>
          <CreatePost />
          <PostCard />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
