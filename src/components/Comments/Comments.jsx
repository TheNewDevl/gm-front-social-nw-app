import CommentCard from './CommentCard'
import { Typography } from '@mui/material'
import Loader from '../Loader/Loader'

function Comments({
  getCommentsfn,
  queryComRefs,
  comments,
  isLoading,
  error,
  setDataComment,
}) {
  const GetMoreComments = () => {
    // display 'afficher plus' only if there are more comments to display
    if (
      comments &&
      queryComRefs.current.count > 0 &&
      queryComRefs.current.count > queryComRefs.current.offset
    ) {
      return (
        <Typography
          color="primary"
          component="a"
          variant="caption"
          sx={{ display: 'block', cursor: 'pointer' }}
          align="center"
          onClick={getCommentsfn}
        >
          Afficher précédents
        </Typography>
      )
    }
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className="comments__container">
      {isLoading && <Loader />}
      <GetMoreComments />
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comments={comments}
              setDataComment={setDataComment}
              comment={comment}
            />
          </div>
        ))}
    </div>
  )
}

export default Comments
