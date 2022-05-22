import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import {
  AlertContext,
  PostsContext,
  UserContext,
} from '../../utils/context/context'

function LikesManagement({ post }) {
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)

  const [likesCount, setLikesCount] = useState(0)
  const [error, setError] = useState()

  //display number of likes per post
  useEffect(() => {
    if (post) {
      setLikesCount(post.likes.length)
    }
  }, [data, post])

  const updateDom = (type) => {
    const oldData = [...data]
    //find the post index and the post likes array
    const index = oldData.findIndex((p) => p.id === post.id)
    const startLikes = oldData[index].likes

    if (type === 'unlike') {
      const endLikes = startLikes.filter((p) => p.id !== user.user.id)
      oldData[index].likes = endLikes
      setAlertStates({
        open: true,
        type: 'info',
        message: `${post.user.username} est triste que vous n'aimiez plus son post !`,
      })
    } else {
      startLikes.push({ id: user.user.id })
      oldData[index].likes = startLikes
      setAlertStates({
        open: true,
        type: 'success',
        message: `${post.user.username} vous remercie !`,
      })
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
        `${process.env.REACT_APP_LOCALIP_URL_API}posts/likes/${post.id}`,
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
      setError(error.message)
      setAlertStates({
        open: true,
        type: 'error',
        message: { error },
      })
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
    </>
  )
}
export default LikesManagement
