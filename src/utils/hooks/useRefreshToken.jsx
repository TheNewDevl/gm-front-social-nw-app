import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from '../../api/axios'
import { isJWT } from 'class-validator'
import useLogout from '../hooks/useLogout'

const useRefreshToken = () => {
  const { setUser } = useContext(UserContext)
  const logout = useLogout()

  const refresh = async () => {
    const response = await axios.get('auth/refresh')

    if (!isJWT(response?.data?.user?.token)) {
      logout()
    } else {
      setUser(response?.data)
      return response.data.user.token
    }
  }

  return refresh
}

export default useRefreshToken
