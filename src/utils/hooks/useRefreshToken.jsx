import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from '../../api/axios'

const useRefreshToken = () => {
  const { setUser } = useContext(UserContext)

  const refresh = async () => {
    const response = await axios.get('auth/refresh')

    setUser(response?.data)
    return response.data.user.token
  }

  return refresh
}

export default useRefreshToken
