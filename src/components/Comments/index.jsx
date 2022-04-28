import { CardComments, CardTitle } from './comments.style'

export default function Comments({ profile }) {
  return (
    <CardComments>
      <CardTitle>Mes intéractions</CardTitle>
      {profile.comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </CardComments>
  )
}
