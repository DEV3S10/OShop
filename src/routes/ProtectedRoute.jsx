/**
 * ProtectedRoute — guards private pages
 *
 * If user is not authenticated → redirect to /login
 * If adminOnly=true and user is not admin → redirect to /dashboard
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 *   <Route element={<ProtectedRoute adminOnly />}>
 *     <Route path="/admin" element={<AdminPanel />} />
 *   </Route>
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Save where user was trying to go so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
