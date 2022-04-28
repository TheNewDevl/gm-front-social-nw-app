import Profile from '../../components/Profile'
import Posts from '../../components/Posts'
import Comments from '../../components/Comments'

const profile = {
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
  username: 'johndoe',
  name: 'John Doe',
  email: 'mail@mail.fr',
  createdAt: '2020-01-01',
  posts: [
    {
      id: 1,
      image:
        'https://cdn.pixabay.com/photo/2022/04/15/11/23/dog-7134183_960_720.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      createdAt: '2020-01-01',
    },
    {
      id: 2,
      image:
        'https://cdn.pixabay.com/photo/2022/04/15/11/23/dog-7134183_960_720.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      createdAt: '2020-01-01',
    },
  ],
  comments: [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
    },
  ],
}
function Account() {
  return (
    <main>
      {/*  <MainTitle>Mon Profil</MainTitle> */}
      <Profile profile={profile} />
      <Posts profile={profile} />
      <Comments profile={profile} />
    </main>
  )
}

export default Account
