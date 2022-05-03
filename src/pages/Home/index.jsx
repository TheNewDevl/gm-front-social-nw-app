import Header from '../../components/Header'
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import PostCards from '../../components/PostCards'
function Home() {
  return (
    <>
      <Header />
      <h1> réseau !</h1>

      <Grid container>
        <Grid item xs={4} sm={4} md={3}>
          <ToggleButtonGroup
            color="primary"
            fullWidth
            /*  value={hasAccount} */
            exclusive
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ToggleButton size="large" value={false}>
              Publications
            </ToggleButton>
            <ToggleButton value={true}>Vos collègues</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <PostCards />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
