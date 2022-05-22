import { Button } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../utils/context/context'
import { useFetch } from '../../../utils/hooks/custom.hooks'
import Loader from '../../../components/Loader/Loader'
import * as React from 'react'
import PopUp from '../../../components/PopUp/PopUp'
import signUpTime from '../../../utils/time-management'
import DataTable from '../../../components/DataTable/DataTable'

function AccountDetails() {
  const { user, setUser } = useContext(UserContext)
  const { data, isLoading, error } = useFetch(`user/${user.user.id}`)

  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [deleteError, setDeleteError] = useState()
  const [deployed, setDeployed] = useState(false)
  const [displayData, setDisplayData] = useState()

  useEffect(() => {
    if (data) {
      const role = data.roles === 'admin' ? 'Administrateur' : 'Utilisateur'
      const hasProfile = data.hasProfile === 1 ? 'Oui' : 'Non'
      setDisplayData([
        { label: "Nom d'utilisateur", value: data.username },
        { label: 'Email', value: data.email },
        { label: 'Statut', value: role },
        { label: 'Profil actif', value: hasProfile },
        { label: 'Inscrit depuis ', value: signUpTime(data.createdAt) },
      ])
    }
  }, [data])

  //display error if can't get data
  if (error) return <span>Une erreur s'est produite</span>

  const handlePopUp = () => setDeployed(true)

  const closePopUp = () => setDeployed(false)

  const backToAuth = () => setUser('')

  //post request to delete the account
  const handleDelete = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const response = await fetch(
        `${process.env.REACT_APP_LOCALIP_URL_API}user/${user.user.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      const parsedRespose = await response.json()
      console.log(parsedRespose)
      if (parsedRespose.message === 'Utilisateur supprimé !') {
        sessionStorage.clear()
        setDeleted(true)
        setDeployed(false)
      }
    } catch (error) {
      console.log(error)
      setDeleteError(error)
    } finally {
      setLoading(false)
    }
  }

  //display any error during deletion
  if (deleteError) return <span>{deleteError}</span>

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable displayData={displayData} />

          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={handlePopUp}
          >
            Supprimer mon compte
          </Button>
          {deployed && (
            <PopUp
              passiveAction={closePopUp}
              passiveBtnText="Annuler"
              popUpMsg="Souhaitez-vous vraiment supprimer votre compte et toutes les données associées ? Si vous changez d'avis vous devrez créer un nouveau compte."
              loading={loading}
              activeAction={handleDelete}
            />
          )}
          {deleted && (
            <PopUp
              popUpMsg="Votre compte a bien été supprimé. Nous espérons vous revoir bientôt :)."
              passiveAction={backToAuth}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AccountDetails
