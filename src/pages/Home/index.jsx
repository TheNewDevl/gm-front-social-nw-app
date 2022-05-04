import Header from '../../components/Header'
import { Grid } from '@mui/material'
import PostCards from '../../components/PostCards'
function Home() {
  return (
    <>
      <Header />
      <h1> réseau !</h1>

      <Grid container>
        <Grid item xs={4} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={8} md={9}>
          <PostCards />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
