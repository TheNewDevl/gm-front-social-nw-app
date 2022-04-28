import {
  AccoutInfoCard,
  AccountImage,
  AccountActions,
  ActionLink,
  InfoWrapper,
  InfoHeader,
  InfoDetails,
  CardTitle,
} from './profile.style'

function Profile({ profile }) {
  return (
    <AccoutInfoCard>
      <CardTitle>Mon compte</CardTitle>
      <InfoWrapper>
        <InfoHeader>
          <h2>{profile.name}</h2>
          <AccountImage src={profile.avatar} alt="Avatar" />
        </InfoHeader>
        <InfoDetails>
          <p>Nom : {profile.username}</p>
          <p>Email : {profile.email}</p>
          <p>Inscrit depuis : {profile.createdAt}</p>
        </InfoDetails>
      </InfoWrapper>
      <AccountActions>
        <ActionLink>Modifier</ActionLink>
        <ActionLink toDelete>Supprimer mon compte</ActionLink>
      </AccountActions>
    </AccoutInfoCard>
  )
}

export default Profile
