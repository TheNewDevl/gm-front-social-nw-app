import CommentCard from './CommentCard'
import { UserContext } from '../../utils/context/context'
import { useContext, useState, useEffect, useRef } from 'react'
import { Typography } from '@mui/material'
import Loader from '../Loader/Loader'

function Comments({ setDataComment, comments, postId, setCommentsCount }) {
  const { user } = useContext(UserContext)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const queryComRefs = useRef({
    limit: 1,
    offset: 0,
    count: 0,
  })

  const getComments = async () => {
    try {
      setIsLoading(true)
      const uri = `comment/post/${postId}/?limit=${queryComRefs.current.limit}&offset=${queryComRefs.current.offset}`
      const res = await fetch(process.env.REACT_APP_BASE_URL_API + uri, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRes = await res.json()
      if (res.ok) {
        setDataComment((data) => [...data, ...parsedRes[0]])
        setCommentsCount(parsedRes[1])
        queryComRefs.current.count = parsedRes[1]
      } else {
        setError(parsedRes.message)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
      queryComRefs.current.offset += queryComRefs.current.limit
      queryComRefs.current.limit = 5
    }
    console.log(queryComRefs)
  }

  //get comments
  useEffect(() => {
    if (postId) {
      getComments()
    }
  }, [postId])

  console.log(comments.length, queryComRefs.current.offset)
  const GetMoreComments = () => {
    // display 'afficher plus' only if there are more comments to display
    if (
      comments &&
      queryComRefs.current.count > 0 &&
      queryComRefs.current.count > queryComRefs.current.offset
    ) {
      return (
        <Typography
          color="primary"
          component="a"
          variant="caption"
          sx={{ display: 'block', cursor: 'pointer' }}
          align="center"
          onClick={getComments}
        >
          Afficher plus
        </Typography>
      )
    }
  }

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <div className="comments__container">
      {comments &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      {isLoading && <Loader />}
      <GetMoreComments />
    </div>
  )
}

export default Comments
