import { Grid } from '@mui/material'
import { useState } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostsDisplay from '../../components/PostsDisplay/PostsDisplay'
import './Home.scss'

function Home() {
  const [data, setData] = useState([])

  return (
    <main className="main">
      <Grid>
        <CreatePost data={data} setData={setData} />
        <PostsDisplay data={data} setData={setData} />
      </Grid>
    </main>
  )
}

export default Home
