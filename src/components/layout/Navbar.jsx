import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import useCartStore from '../../store/useCartStore'
import ThemeToggle from './ThemeToggle'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const cartCount = useCartStore((s) => s.count())

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tight text-brand-500 shrink-0">
          OShop
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="btn-ghost text-sm">Home</Link>
          <Link to="/products" className="btn-ghost text-sm">Products</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Cart */}
          <Link to="/products" className="btn-ghost relative p-2">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn-ghost text-sm hidden sm:flex">
                  <Shield size={16} /> Admin
                </Link>
              )}
              <Link to="/dashboard" className="btn-ghost text-sm hidden sm:flex">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link to="/profile" className="btn-ghost p-2">
                <User size={20} />
              </Link>
              <button onClick={handleLogout} className="btn-ghost p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary text-sm px-4 py-2">Login</Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
