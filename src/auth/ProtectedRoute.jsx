import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
