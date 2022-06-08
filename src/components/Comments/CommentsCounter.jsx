import { IconButton } from '@mui/material'
import ModeCommentIcon from '@mui/icons-material/ModeComment'

function CommentsCounter({ count, expendCollapse }) {
  return (
    <>
      <IconButton onClick={expendCollapse} aria-label="expand comments">
        <ModeCommentIcon />
        <span className="likesCount">{count && count}</span>
      </IconButton>
    </>
  )
}

export default CommentsCounter
