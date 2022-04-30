import Header from '../../components/Header'

function Home({ setUser }) {
  return (
    <>
      <Header setUser={setUser} />
      <h1>Accueil</h1>
    </>
  )
}

export default Home
