import axios from '../../api/axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const useLogout = () => {
  const { setUser } = useContext(UserContext)

  const logout = async () => {
    setUser('')
    try {
      await axios.get('auth/logout')
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
