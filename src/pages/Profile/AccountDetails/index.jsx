import { Button } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../utils/context/UserContext'
import Loader from '../../../components/Loader/Loader'
import PopUp from '../../../components/PopUp/PopUp'
import signUpTime from '../../../utils/time-management'
import DataTable from '../../../components/DataTable/DataTable'
import useLogout from '../../../utils/hooks/useLogout'
import { RequestsContext } from '../../../utils/context/RequestsContext'
import { AlertContext } from '../../../utils/context/AlertContext'
import useSecureAxios from '../../../utils/hooks/useSecureAxios'

function AccountDetails() {
  const { user, setUser } = useContext(UserContext)
  const [deleted, setDeleted] = useState(false)
  const [deployed, setDeployed] = useState(false)
  const [displayData, setDisplayData] = useState()
  const { useGetData } = useContext(RequestsContext)
  const { data, error } = useGetData(`user/${user.user.id}`)
  const { setAlertStates } = useContext(AlertContext)
  const logout = useLogout()
  const secureAxios = useSecureAxios()
  const [isLoading, setIsLoading] = useState(false)

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
  if (error) return <span>{`${error}`}</span>

  const handlePopUp = () => setDeployed(true)

  const closePopUp = () => setDeployed(false)

  const backToAuth = async () => {
    await logout()
    setUser('')
  }

  //post request to delete the account
  const handleDelete = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      await secureAxios.delete(`user/${user.user.id}`)
      localStorage.clear()
      setDeleted(true)
      setDeployed(false)
    } catch (err) {
      setAlertStates({
        open: true,
        type: 'error',
        message: `Une erreur est survenue, contactez votre administrateur`,
      })
    } finally {
      setIsLoading(false)
    }
  }

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
              loading={isLoading}
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
