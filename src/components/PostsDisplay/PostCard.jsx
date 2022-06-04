import React, { useState, useContext, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeletePost from './DeletePost'
import UpdatePost from './UpdatePost'
import timeManagement from '../../utils/time-management'
import LikesManagement from './LikesManagement'
import CreateComment from '../CreateComment/CreateComment'
import CommentsCounter from '../Comments/CommentsCounter'
import { Divider } from '@mui/material'
import Comments from '../Comments/Comments'
import { UserContext } from '../../utils/context/UserContext'
import ProfilesDiag from '../ProfileDiag/ProfileDiag'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function PostCard({ post }) {
  const [expanded, setExpanded] = React.useState(false)
  //comments state
  const [dataComment, setDataComment] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const date = timeManagement(post.createdAt)

  // profiles diag
  const [openProfilesDiag, setOpenProfilesDiag] = React.useState(false)

  const handleClickOpen = () => {
    setOpenProfilesDiag(true)
  }

  const handleClose = () => {
    setOpenProfilesDiag(false)
  }

  /*********** LOGIQUE DE RECUPERATION DES COMMENTAIRES A REPLACER */
  const { user } = useContext(UserContext)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const queryComRefs = useRef({
    limit: 5,
    offset: 0,
    count: 0,
  })

  const getComments = async () => {
    try {
      setIsLoading(true)
      const uri = `comment/post/${post.id}/?limit=${queryComRefs.current.limit}&offset=${queryComRefs.current.offset}`
      const res = await fetch(process.env.REACT_APP_LOCALIP_URL_API + uri, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRes = await res.json()
      if (res.ok) {
        setDataComment((data) => [...data, ...parsedRes[0].reverse()])
        queryComRefs.current.count = parsedRes[1]
      } else {
        setError(parsedRes.message)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
      queryComRefs.current.offset += queryComRefs.current.limit
    }
  }
  /**************** LOGIQUE DE RECUPERATION DES COMMENTAIRES A REPLACER */

  //get comments
  React.useEffect(() => {
    if (expanded && queryComRefs.current.offset === 0) {
      getComments()
    }
  }, [expanded])

  return (
    <Card data-id={post.id} className="post">
      <CardHeader
        avatar={
          <Avatar
            src={post.user.profile && post.user.profile.photo}
            alt={`Photo de profil de ${post.user.username}`}
            aria-label="post"
          />
        }
        action={
          <>
            <DeletePost post={post} />
            <UpdatePost post={post} />
          </>
        }
        title={
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            color="primary"
            fontWeight="fontWeightBold"
            variant="body1"
            component="p"
            onClick={handleClickOpen}
            title={`Consulter le profil de ${post.user.username} `}
          >{`@${post.user.username}`}</Typography>
        }
        subheader={date}
      />
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt={`image du post de ${post.user.username}`}
        />
      )}

      <CardContent>
        <Typography whiteSpace="pre-wrap" variant="body1" color="text.">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikesManagement post={post} />
        <CommentsCounter
          count={post.commentsCount}
          expendCollapse={handleExpandClick}
        />

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comment and show comments"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comments
          queryComRefs={queryComRefs}
          getCommentsfn={getComments}
          comments={dataComment}
          setDataComment={setDataComment}
          isLoading={isLoading}
          error={error}
        />
        <CreateComment
          dataComment={dataComment}
          setDataComment={setDataComment}
          post={post}
        />
      </Collapse>
      {openProfilesDiag && (
        <ProfilesDiag
          open={openProfilesDiag}
          handleClose={handleClose}
          userId={post.user.id}
        />
      )}
    </Card>
  )
}
