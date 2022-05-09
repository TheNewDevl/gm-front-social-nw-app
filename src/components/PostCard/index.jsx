import { useFetch } from '../../utils/hooks/custom.hooks'

function PostCards() {
  const { data, error, isLoading } = useFetch('posts')

  return (
    <div className="rounded-lg p-10 shadow-lg hover:shadow-xl">
      {data &&
        data.map((post) => (
          <div
            key={post.id}
            className="rounded-lg p-10 shadow-lg hover:shadow-xl"
          >
            <img src={post.image} alt="Illustration de la publication" />
            <p>{post.text}</p>
            <br />
            <a href="">{post.user.username}</a>
          </div>
        ))}
    </div>
  )
}

export default PostCards
