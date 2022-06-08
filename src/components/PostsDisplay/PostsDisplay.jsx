import Loader from '../Loader/Loader'
import { useContext, useEffect } from 'react'
import { PostsContext } from '../../utils/context/PostsContext'
import Typography from '@mui/material/Typography'
import './PostsDisplay.scss'
import PostCard from './PostCard'
import useLoadPosts from '../../utils/hooks/useGetPosts'
import PropTypes from 'prop-types'

function PostsDisplay({ id }) {
  const { noContent, setNoContent, data, setData, error, isLoading } =
    useContext(PostsContext)

  const loadPosts = useLoadPosts(id)

  const handleScroll = async (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight
      // at the bottem => need
    ) {
      await loadPosts()
    }
  }

  //infinite scroll
  useEffect(() => {
    loadPosts()
    setTimeout(() => {
      !isLoading && window.addEventListener('scroll', handleScroll)
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      setData([])
      setNoContent(false)
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
      {data.length > 0 &&
        data.map((post) => <PostCard key={post.id} post={post} />)}
      {isLoading && <Loader />}
      {noContent && (
        <Typography sx={{ textAlign: 'center' }} variant="button" component="p">
          Aucune autre publication à afficher
        </Typography>
      )}
    </div>
  )
}

PostsDisplay.propTypes = {
  id: PropTypes.string,
}

export default PostsDisplay
