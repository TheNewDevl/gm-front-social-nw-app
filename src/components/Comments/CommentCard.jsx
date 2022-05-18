import { Avatar, Button } from '@mui/material'
import './CommentCard.scss'
import timeManagement from '../../pages/Profile/AccountDetails/time-management'
import CommentActions from './CommentActions'

function CommentCard({
  commentAlert,
  setCommentAlert,
  commentsCount,
  setCommentsCount,
  comments,
  setDataComment,
  comment,
}) {
  const time = timeManagement(comment.createdAt)
  return (
    <div data-id={comment.id} className="comment">
      <div>
        <Avatar
          src={comment.user.profile && comment.user.profile.photo}
          alt={`Photo de profil de ''`}
          className="comment__avatar"
          sx={{ width: 32, height: 32 }}
        />
      </div>
      <div className="comment__content">
        <div className="comment__content--inner">
          <h3 className="comment__content--header">@{comment.user.username}</h3>
          <p className="comment__content--text">{comment.text}</p>
        </div>
        <div className="comment__actions">
          <p className="comment__content--time">{time}</p>
          <CommentActions
            commentAlert={commentAlert}
            setCommentAlert={setCommentAlert}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
            comments={comments}
            setDataComment={setDataComment}
            comment={comment}
            userId={comment.user.id}
          />
        </div>
      </div>
    </div>
  )
}

export default CommentCard
