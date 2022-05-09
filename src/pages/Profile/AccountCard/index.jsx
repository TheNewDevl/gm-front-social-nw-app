import {
  AccoutInfoCard,
  AccountActions,
  ActionLink,
  CardTitle,
} from './profile.style'
import { useContext, useState } from 'react'
import { UserContext } from '../../../utils/context/context'
import AccountDetails from '../AccountDetails'

function AccountCard({ data }) {
  const { user } = useContext(UserContext)
  const [onChanging, setOnChanging] = useState(false)

  return (
    <AccoutInfoCard>
      <CardTitle>Mon compte</CardTitle>

      <AccountDetails />

      <AccountActions>
        {!onChanging ? (
          <ActionLink onClick={() => setOnChanging(true)}>Modifier</ActionLink>
        ) : (
          <ActionLink onClick={() => setOnChanging(false)}>
            Confirmer
          </ActionLink>
        )}
        <ActionLink toDelete>Supprimer mon compte</ActionLink>
      </AccountActions>
    </AccoutInfoCard>
  )
}

export default AccountCard
