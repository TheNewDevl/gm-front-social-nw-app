import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../utils/context/UserContext'

function ProtectedRoute() {
  const { user } = useContext(UserContext)

  if (!user && !user.includes('token')) {
    return <Navigate to="/auth" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
