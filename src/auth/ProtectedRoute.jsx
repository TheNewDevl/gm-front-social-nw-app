import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../utils/context/context'

function ProtectedRoute() {
  const { user } = useContext(UserContext)

  if (!user && !user.includes('token')) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
