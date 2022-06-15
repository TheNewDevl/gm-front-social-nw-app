import { IconButton, Typography } from '@mui/material'
import ModeCommentIcon from '@mui/icons-material/ModeComment'

function CommentsCounter({ count, expendCollapse }) {
  return (
    <>
      <IconButton onClick={expendCollapse} aria-label="expand comments">
        <ModeCommentIcon />
        <Typography
          component="span"
          fontWeight="700"
          fontSize="0.9em"
          marginLeft="5px"
          marginRight="15px"
        >
          {count && count}
        </Typography>
      </IconButton>
    </>
  )
}

export default CommentsCounter
