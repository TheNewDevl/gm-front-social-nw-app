import { useState } from 'react'
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
  //will open the post comments container
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  //comment state, will be passed and used in more than one component
  const [dataComment, setDataComment] = useState([])

  //format created time date
  const date = timeManagement(post.createdAt)

  //profiles diag
  const [openProfilesDiag, setOpenProfilesDiag] = useState(false)
  const handleClose = () => {
    setOpenProfilesDiag(false)
  }

  return (
    <Card data-id={post.id} sx={{ m: '1em 0' }}>
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
            variant="subtitle1"
            component="p"
            onClick={() => setOpenProfilesDiag(true)}
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
        <Typography whiteSpace="pre-wrap" variant="body1">
          {post.text}
        </Typography>
      </CardContent>
      <Divider />

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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />

        <Comments
          comments={dataComment}
          setDataComment={setDataComment}
          post={post}
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
