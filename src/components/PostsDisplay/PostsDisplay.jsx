import Loader from '../Loader/Loader'
import { useContext, useEffect, useState, useRef } from 'react'
import { PostsContext } from '../../utils/context/PostsContext'
import Typography from '@mui/material/Typography'
import './PostsDisplay.scss'
import PostCard from './PostCard'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function PostsDisplay() {
  const { data, setData } = useContext(PostsContext)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const queryRefs = useRef({
    limit: 10,
    offset: 0,
    count: 0,
  })
  const secureAxios = useSecureAxios()
  const uri = `posts/?limit=${queryRefs.current.limit}&offset=${queryRefs.current.offset}`

  //get posts with pagination with uploading offset while scrolling the page
  const loadPosts = async () => {
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
    try {
      setIsLoading(true)
      const res = await secureAxios.get(uri)
      setData((data) => [...data, ...res.data[0]])
      queryRefs.current.count = res.data[1]
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      } else if (error.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(error.message)
        console.log(error)
      }
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
      setData([])
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
