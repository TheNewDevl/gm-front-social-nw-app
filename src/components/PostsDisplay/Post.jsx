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
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { Button, TextareaAutosize } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DeletePost from './DeletePost'
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

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const createdAt = new Date(post.createdAt)
  const date =
    createdAt.toLocaleDateString() + ' ' + createdAt.toLocaleTimeString()

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
          <DeletePost
            alertStatus={alertStatus}
            setData={setData}
            data={data}
            post={post}
          />
        }
        title={post.user.username}
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="add to favorites">
          <ModeCommentIcon expand={expanded} />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextareaAutosize
            className="bio__input"
            required
            minRows={2}
            maxRows={20}
            name="text"
            aria-label="saisie du contenu textuel"
            placeholder="Réagissez à cette publication ici"
          />
        </CardContent>

        <Button style={{ margin: '1em' }} type="submit">
          Publier <SendIcon className="upload__icon" />
        </Button>
      </Collapse>
    </Card>
  )
}
