import { Checkbox, FormControlLabel } from '@mui/material'
import { UserContext } from '../../utils/context/UserContext'
import { useContext, useEffect } from 'react'

function RememberCheckBox() {
  const { remember, setRemember } = useContext(UserContext)

  const handleRemember = (first) => {
    setRemember(!remember)
  }

  useEffect(() => {
    localStorage.setItem('remember', remember)
  }, [remember])

  return (
    <FormControlLabel
      value={remember}
      control={
        <Checkbox
          onChange={handleRemember}
          value="remember"
          color="primary"
          checked={remember}
        />
      }
      label="Se souvenir de moi"
    />
  )
}

export default RememberCheckBox
