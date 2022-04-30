import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../utils/context/context'

function ProtectedRoute() {
  const { user, setUser } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
