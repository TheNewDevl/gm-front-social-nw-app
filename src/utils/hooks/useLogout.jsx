import axios from '../../api/axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const useLogout = () => {
  const { setUser, setHasProfile } = useContext(UserContext)

  const logout = async () => {
    setUser('')
    setHasProfile('')
    try {
      await axios.get('auth/logout')
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
