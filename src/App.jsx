import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import useThemeStore from './store/useThemeStore'
import ProtectedRoute from './routes/ProtectedRoute'

import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from './layouts/AuthLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  const { initTheme } = useThemeStore()
  useEffect(() => { initTheme() }, [initTheme])

  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected: logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Protected: admin only */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
