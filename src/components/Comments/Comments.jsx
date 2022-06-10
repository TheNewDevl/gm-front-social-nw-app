import CommentCard from './CommentCard'
import { Box, Typography } from '@mui/material'
import Loader from '../Loader/Loader'
import { useContext, useEffect, useRef, useState } from 'react'
import { RequestsContext } from '../../utils/context/RequestsContext'
import { AlertContext } from '../../utils/context/AlertContext'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

export const defaultScroll = () => {
  const commentsContainer = document.querySelector('#comments__Container')
  commentsContainer.scrollTop = commentsContainer.scrollHeight
}

function Comments({ comments, setDataComment, post }) {
  const { setAlertStates } = useContext(AlertContext)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const queryComRefs = useRef({
    limit: 5,
    offset: 0,
  })

  //to auto scroll when create new comments or open component
  useEffect(() => {
    defaultScroll()
  }, [comments])

  const uri = `comment/post/${post.id}/?limit=${queryComRefs.current.limit}&offset=${queryComRefs.current.offset}`
  const secureAxios = useSecureAxios()

  //API request
  const getComments = async () => {
    try {
      setIsLoading(true)
      const response = await secureAxios.get(uri)
      setDataComment((data) => [
        ...response.data.comments[0].reverse(),
        ...data,
      ])
      queryComRefs.current.count = response.data.comments[1]
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
    } finally {
      queryComRefs.current.offset += queryComRefs.current.limit
      setIsLoading(false)
    }
  }

  //get comments
  useEffect(() => {
    if (queryComRefs.current.offset === 0) {
      getComments()
    }
    return () => setDataComment([])
  }, [])

  //catch request errors and use it
  useEffect(() => {
    if (error) {
      setAlertStates({ open: true, type: 'error', message: `${error}` })
    }
  }, [error])

  // display 'afficher plus' only if there are more comments to display
  const GetMoreComments = () => {
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
          sx={{ display: 'block', cursor: 'pointer', mt: '1em' }}
          align="center"
          onClick={getComments}
        >
          Afficher précédents
        </Typography>
      )
    }
  }

  const NoComments = () => {
    if (queryComRefs.current.count === 0) {
      return (
        <Typography
          color="primary"
          align="center"
          variant="subtitle1"
          component="p"
        >
          Soyez le premier à commenter cette publication !
        </Typography>
      )
    }
  }

  if (error) {
    return (
      <Typography componenent="div" variant="subtitle2" color="error">
        {`${error}`}
      </Typography>
    )
  }

  return (
    <>
      <GetMoreComments />
      <Box
        maxHeight="50vh"
        sx={{ overflowY: 'scroll', mt: 2 }}
        id="comments__Container"
      >
        {isLoading && <Loader />}
        <NoComments />
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard
                comments={comments}
                setDataComment={setDataComment}
                comment={comment}
              />
            </div>
          ))}
      </Box>
    </>
  )
}

export default Comments
