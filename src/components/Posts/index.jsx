import { ActionLink } from '../../pages/Profile/AccountCard/profile.style'
import { PostsCard, CardTitle, Post, PostImg, PostDetails } from './posts.style'

export default function Posts({ profile }) {
  return (
    <PostsCard>
      <CardTitle>Mes publications</CardTitle>

      {profile.posts.map((post) => (
        <Post key={post.id}>
          <div>
            <PostImg src={post.image} alt="Post" />
          </div>
          <PostDetails>
            <p>{post.content}</p>
            <p>{post.createdAt}</p>
            <ActionLink toDelete>Supprimer cette publication</ActionLink>
          </PostDetails>
        </Post>
      ))}
    </PostsCard>
  )
}
