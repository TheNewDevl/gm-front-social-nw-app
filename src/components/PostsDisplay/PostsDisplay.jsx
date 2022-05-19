import Loader from '../Loader/Loader'
import { useContext, useEffect, useState, useRef } from 'react'
import { PostsContext, UserContext } from '../../utils/context/context'
import Typography from '@mui/material/Typography'
import './PostsDisplay.scss'
import PostCard from './PostCard'

function PostsDisplay() {
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const queryRefs = useRef({
    limit: 10,
    offset: 0,
    count: 0,
  })

  //get posts with pagination with uploading offset while scrolling the page
  const loadPosts = async () => {
    try {
      //prevent bad request using the count query
      if (
        queryRefs.current.offset > 0 &&
        queryRefs.current.offset >= queryRefs.current.count
      ) {
        return
      }
      if (
        queryRefs.current.offset > 0 &&
        queryRefs.current.count - queryRefs.current.offset <
          queryRefs.current.limit
      ) {
        queryRefs.current.limit =
          queryRefs.current.count - queryRefs.current.offset
      }

      setIsLoading(true)
      const res = await fetch(
        `http://localhost:3000/api/posts/?limit=${queryRefs.current.limit}&offset=${queryRefs.current.offset}`,
        {
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      const parsedRes = await res.json()
      if (res.ok) {
        console.log(parsedRes)
        setData((data) => [...data, ...parsedRes[0]])
        queryRefs.current.count = parsedRes[1]
      }
      setError(parsedRes.message)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
      queryRefs.current.offset += queryRefs.current.limit
    }
  }

  //load more data a little bite before the end of the page
  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight
    ) {
      loadPosts()
    }
  }

  //infinite scroll
  useEffect(() => {
    loadPosts()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //display errors
  if (error) {
    return (
      <Typography component="div" variant="h5" color="error">
        {error}
      </Typography>
    )
  }
  return (
    <div>
      {data && data.map((post) => <PostCard key={post.id} post={post} />)}
      {isLoading && <Loader />}
    </div>
  )
}

export default PostsDisplay
