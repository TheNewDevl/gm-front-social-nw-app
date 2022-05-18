import * as React from 'react'
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
import timeManagement from '../../pages/Profile/AccountDetails/time-management'
import LikesManagement from './LikesManagement'
import CreateComment from '../CreateComment/CreateComment'
import CommentsCounter from '../Comments/CommentsCounter'
import { Divider } from '@mui/material'
import Comments from '../Comments/Comments'
import { UserContext } from '../../utils/context/context'
import FeedBackAlert from '../Alert/FeedBackAlert'

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

export default function PostCard({ setData, data, post, alertStatus }) {
  const [expanded, setExpanded] = React.useState(false)
  //comments state
  const [dataComment, setDataComment] = React.useState([])
  const [commentsCount, setCommentsCount] = React.useState(undefined)
  const [commentAlert, setCommentAlert] = React.useState({
    success: false,
    fail: false,
  })
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const date = timeManagement(post.createdAt)

  /*********** LOGIQUE DE RECUPERATION DES COMMENTAIRES A REPLACER */
  const { user } = React.useContext(UserContext)
  const [error, setError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const queryComRefs = React.useRef({
    limit: 1,
    offset: 0,
    count: 0,
  })

  const getComments = async () => {
    try {
      setIsLoading(true)
      const uri = `comment/post/${post.id}/?limit=${queryComRefs.current.limit}&offset=${queryComRefs.current.offset}`
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
  }
  /**************** LOGIQUE DE RECUPERATION DES COMMENTAIRES A REPLACER */

  //get comments
  React.useEffect(() => {
    if (post.id && queryComRefs.current.offset === 0) {
      getComments()
    }
  }, [])

  return (
    <Card data-id={post.id} className="post">
      <CardHeader
        avatar={
          <Avatar
            src={post.user.profile && post.user.profile.photo}
            alt={`Photo de profil de ${post.user.username}`}
            aria-label="post"
          ></Avatar>
        }
        action={
          <>
            <DeletePost
              alertStatus={alertStatus}
              setData={setData}
              data={data}
              post={post}
            />
            <UpdatePost
              alertStatus={alertStatus}
              setData={setData}
              data={data}
              post={post}
            />
          </>
        }
        titleTypographyProps={{
          color: 'primary',
          fontWeight: 'fontWeightBold',
          variant: 'body1',
        }}
        title={`@${post.user.username}`}
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
        <Typography variant="body1" color="text.">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikesManagement post={post} data={data} setData={setData} />
        <CommentsCounter
          count={commentsCount}
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
          commentAlert={commentAlert}
          setCommentAlert={setCommentAlert}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
          queryComRefs={queryComRefs}
          getCommentsfn={getComments}
          comments={dataComment}
          setDataComment={setDataComment}
          isLoading={isLoading}
          error={error}
        />
        <CreateComment
          setCommentAlert={setCommentAlert}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
          dataComment={dataComment}
          setDataComment={setDataComment}
          postId={post.id}
        />
      </Collapse>

      <FeedBackAlert />
    </Card>
  )
}
