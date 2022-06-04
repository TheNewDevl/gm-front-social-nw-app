import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../utils/context/UserContext'
import { isJWT } from 'class-validator'

function ProtectedRoute() {
  const { user } = useContext(UserContext)

  if (!user || !user.user.hasOwnProperty('token') || !isJWT(user.user.token)) {
    return <Navigate to="/auth" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
