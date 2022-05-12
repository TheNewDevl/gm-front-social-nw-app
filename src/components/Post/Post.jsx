import Loader from '../Loader/Loader'
import { useContext } from 'react'
import { UserContext } from '../../utils/context/context'
import Typography from '@mui/material/Typography'
import './Post.scss'
import { useEffect, useState } from 'react'

function PostCards() {
  const { user } = useContext(UserContext)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let limit = 10
  let offset = 0

  const loadPosts = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:3000/api/posts/?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      console.log(res)
      const parsedRes = await res.json()
      if (res.ok) {
        console.log(parsedRes)
        setData((data) => [...data, ...parsedRes])
      }
      setError(parsedRes.message)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
    offset += 10
  }

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      console.log('at the bottom of the page')
      loadPosts()
    }
  }

  useEffect(() => {
    loadPosts()
    window.addEventListener('scroll', handleScroll)
  }, [])

  if (error) {
    return (
      <Typography component="div" variant="h5" color="error">
        {error}
      </Typography>
    )
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data &&
            data.map((post) => (
              <div className="post-cards" key={post.id}>
                <img src={post.image} alt="Illustration de la publication" />
                <p>{post.text}</p>
                <br />
                <a href="">{post.user.username}</a>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default PostCards
