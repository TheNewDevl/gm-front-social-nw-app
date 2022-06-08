import CommentCard from './CommentCard'
import { Box, Typography } from '@mui/material'
import Loader from '../Loader/Loader'
import { useContext, useEffect, useRef, useState } from 'react'
import { RequestsContext } from '../../utils/context/RequestsContext'
import { AlertContext } from '../../utils/context/AlertContext'

export const defaultScroll = () => {
  const commentsContainer = document.querySelector('#comments__Container')
  commentsContainer.scrollTop = commentsContainer.scrollHeight
}

function Comments({ comments, setDataComment, post }) {
  const {
    isLoading,
    requestData,
    setRequestData,
    requestError,
    setRequestError,
    makeRequest,
  } = useContext(RequestsContext)
  const { setAlertStates } = useContext(AlertContext)
  const [error, setError] = useState()
  const queryComRefs = useRef({
    limit: 5,
    offset: 0,
    count: 0,
  })

  //to auto scroll when create new comments or open component
  useEffect(() => {
    defaultScroll()
  }, [comments])

  //API request
  const getComments = async () => {
    try {
      const uri = `comment/post/${post.id}/?limit=${queryComRefs.current.limit}&offset=${queryComRefs.current.offset}`
      const method = 'get'
      await makeRequest(method, uri)
    } catch (err) {
      setAlertStates({ open: true, type: 'error', message: `${err}` })
    } finally {
      queryComRefs.current.offset += queryComRefs.current.limit
    }
  }

  //catch request data
  useEffect(() => {
    if (requestData && requestData.comments) {
      setDataComment((data) => [...requestData.comments[0].reverse(), ...data])
      queryComRefs.current.count = requestData.comments[1]
    }
    return () => setRequestData('')
  }, [requestData, setRequestData, queryComRefs, setDataComment])

  //get comments
  useEffect(() => {
    if (queryComRefs.current.offset === 0) {
      getComments()
    }
    return () => setDataComment([])
  }, [])

  //catch request errors and use it
  useEffect(() => {
    requestError && setError(requestError)
    return () => setRequestError('')
  }, [requestError, setRequestError])

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

  if (error) {
    return (
      <Typography componenent="div" variant="subtitle2" color="error">
        {`${error}`}
      </Typography>
    )
  }

  return (
    <Box maxHeight="50vh" sx={{ overflowY: 'scroll' }} id="comments__Container">
      {isLoading && <Loader />}
      <GetMoreComments />
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
  )
}

export default Comments
