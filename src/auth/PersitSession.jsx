import { useState, useEffect, useContext } from 'react'
import useRefreshToken from '../utils/hooks/useRefreshToken'
import { UserContext } from '../utils/context/UserContext'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

const PersitSession = () => {
  const [isLoading, setisLoading] = useState(true)
  const refresh = useRefreshToken()
  const { user, remember } = useContext(UserContext)
  console.log(remember)

  useEffect(() => {
    const checkRefreshTokenValidity = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        setisLoading(false)
      }
    }

    if (!user && remember) {
      checkRefreshTokenValidity()
    } else {
      setisLoading(false)
    }
    return () => {}
  }, [])

  return (
    <>
      {!remember ? (
        <Outlet />
      ) : isLoading ? (
        <Loader style={{ borderWidth: '10px', marginTop: '5em' }} />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default PersitSession
