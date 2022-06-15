import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { PostsContext } from '../../utils/context/PostsContext'
import { UserContext } from '../../utils/context/UserContext'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function LikesManagement({ post }) {
  const { data, setData } = useContext(PostsContext)
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)
  const [likesCount, setLikesCount] = useState(0)
  const secureAxios = useSecureAxios()
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
        message: `${post.user.username} est triste que vous n'aimiez plus sa publication !`,
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
      await secureAxios.patch(`posts/likes/${post.id}`, body)
      updateDom(body.like)
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
    }
  }

  useEffect(() => {
    if (error) {
      setAlertStates({ open: true, type: 'error', message: `${error}` })
    }
  }, [error])

  return (
    <>
      <IconButton onClick={handleLike} aria-label="add to favorites">
        <FavoriteIcon
          color={post.likes.find((p) => p.id === user.user.id) && 'error'}
        />
        <Typography
          component="span"
          fontWeight="700"
          fontSize="0.9em"
          marginLeft="5px"
          marginRight="15px"
        >
          {likesCount}
        </Typography>
      </IconButton>
    </>
  )
}
export default LikesManagement
