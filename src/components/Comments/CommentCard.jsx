import { Avatar, Stack, Typography } from '@mui/material'
import timeManagement from '../../utils/time-management'
import CommentActions from './CommentActions'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import ProfilesDiag from '../ProfileDiag/ProfileDiag'
function CommentCard({ comments, setDataComment, comment }) {
  const theme = useTheme()
  const time = timeManagement(comment.createdAt)

  //profiles diag
  const [openProfilesDiag, setOpenProfilesDiag] = useState(false)
  const handleClose = () => {
    setOpenProfilesDiag(false)
  }
  return (
    <Stack direction="row" p="1em" pb="0.3em" data-id={comment.id}>
      <Avatar
        src={comment.user.profile && comment.user.profile.photo}
        alt={`Photo de profil de ${comment.user.id}`}
        className="comment__avatar"
        sx={{ width: 32, height: 32, mt: '0.5em' }}
      />
      <Box ml="1em">
        <Box
          pt="0.5em"
          pb="0.7em"
          px="1em"
          borderRadius="15px"
          sx={{ backgroundColor: theme.palette.background.default }}
        >
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
            title={`Consulter le profil de ${comment.user.username} `}
          >{`@${comment.user.username}`}</Typography>
          <Typography whiteSpace="pre-wrap" variant="body1" component="p">
            {comment.text}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" className="comment__actions">
          <Typography variant="caption" component="span">
            {time}
          </Typography>
          <CommentActions
            comments={comments}
            setDataComment={setDataComment}
            comment={comment}
            userId={comment.user.id}
          />
        </Stack>
      </Box>
      {openProfilesDiag && (
        <ProfilesDiag
          open={openProfilesDiag}
          handleClose={handleClose}
          userId={comment.user.id}
        />
      )}
    </Stack>
  )
}

export default CommentCard
