import { secureAxios } from '../../api/axios'
import { useEffect, useContext } from 'react'
import useRefreshToken from './useRefreshToken'
import { UserContext } from '../context/UserContext'

const useSecureAxios = () => {
  const refresh = useRefreshToken()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const reqInterceptor = secureAxios.interceptors.request.use(
      (config) => {
        console.log(user.user.token)
        if (!config.headers['Authorization']) {
          console.log('in the if statement')
          console.log({ userStateToken: user?.user?.token })
          config.headers['Authorization'] = `Bearer ${user?.user?.token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const resInterceptor = secureAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const initialRequest = error?.config
        if (error?.response.status === 401 && !initialRequest?.retry) {
          console.log('RETRYYYYY')
          initialRequest.retry = true
          const newToken = await refresh()
          console.log(newToken)
          initialRequest.headers['Authorization'] = `Bearer ${newToken}`
          return secureAxios(initialRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      secureAxios.interceptors.request.eject(reqInterceptor)
      secureAxios.interceptors.response.eject(resInterceptor)
    }
  }, [user, refresh])

  return secureAxios
}

export default useSecureAxios
