import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/context/context'
import SuccessAlert from '../Alert/SuccessAlert'

function LikesManagement({ post, data, setData }) {
  const { user } = useContext(UserContext)
  const [likesCount, setLikesCount] = useState(0)
  const [error, setError] = useState()
  const [openAlert, setOpenAlert] = useState({
    success: false,
    fail: false,
    dislike: false,
  })
  //display number of likes per post
  useEffect(() => {
    if (post) {
      setLikesCount(post.likes.length)
    }
  }, [data, post])

  //handle snackbar close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert({
      success: false,
      fail: false,
    })
  }

  const updateDom = (type) => {
    const oldData = [...data]
    //find the post index and the post likes array
    const index = oldData.findIndex((p) => p.id === post.id)
    const startLikes = oldData[index].likes

    if (type === 'unlike') {
      const endLikes = startLikes.filter((p) => p.id !== user.user.id)
      oldData[index].likes = endLikes
      setOpenAlert({ dislike: true })
    } else {
      startLikes.push({ id: user.user.id })
      oldData[index].likes = startLikes
      setOpenAlert({ success: true })
    }
    //update state
    setData(oldData)
  }

  const handleLike = async () => {
    const body = post.likes.find((p) => p.id === user.user.id)
      ? { like: 'unlike' }
      : { like: 'like' }
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/likes/${post.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      if (res.ok) {
        updateDom(body.like)
      } else {
        console.log(res)
      }
    } catch (error) {
      setError(error)
      setOpenAlert({ fail: true })
      console.log(error)
    }
  }

  return (
    <>
      <IconButton onClick={handleLike} aria-label="add to favorites">
        <FavoriteIcon
          color={post.likes.find((p) => p.id === user.user.id) && 'error'}
        />
        <span className="likesCount">{likesCount}</span>
      </IconButton>
      <SuccessAlert
        message={
          openAlert.success
            ? `${post.user.username} vous remercie !`
            : `${post.user.username} est triste que vous n'aimiez plus son post !`
        }
        open={openAlert.success || openAlert.dislike}
        handleClose={handleClose}
        type={openAlert.success ? 'success' : 'warning'}
      />
      <SuccessAlert
        message={error}
        open={openAlert.fail}
        handleClose={handleClose}
        type="error"
      />
    </>
  )
}
export default LikesManagement
