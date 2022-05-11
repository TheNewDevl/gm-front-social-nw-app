import { useContext, useState } from 'react'
import { UserContext } from '../../utils/context/context'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

function Interactions() {
  const { user } = useContext(UserContext)
  const [display, setDisplay] = useState('interactions')

  const handleClick = (e) => {
    setDisplay(e.currentTarget.value)
  }

  return (
    <main className="main">
      <ToggleButtonGroup color="primary" fullWidth value={display} exclusive>
        <ToggleButton onClick={handleClick} size="large" value="interactions">
          Mes publications
        </ToggleButton>
        <ToggleButton onClick={handleClick} value="account">
          Mes commentaires
        </ToggleButton>
      </ToggleButtonGroup>

      {display === 'interactions' ? (
        <div>
          <h1>Mes publications</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tempor congue, nisi nunc tristique
            nunc, euismod egestas nisl nisi euismod.
          </p>
        </div>
      ) : (
        <div>
          <h1>Mes commentaires</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tempor congue, nisi nunc tristique
            nunc, euismod egestas nisl nisi euismod.
          </p>
        </div>
      )}
    </main>
  )
}
export default Interactions
