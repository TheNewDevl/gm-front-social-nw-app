import { Grid } from '@mui/material'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/PostCard'
import './Home.scss'

function Home() {
  return (
    <main className="main">
      <Grid>
        <Grid>
          <CreatePost />
          <PostCard />
        </Grid>
      </Grid>
    </main>
  )
}

export default Home
