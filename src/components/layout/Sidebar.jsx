import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, PlusCircle, Shield, User } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'

export default function Sidebar() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/profile', icon: User, label: 'My Profile' },
    ...(isAdmin
      ? [
          { to: '/admin', icon: Shield, label: 'Admin Panel' },
          { to: '/products/create', icon: PlusCircle, label: 'Create Product' },
        ]
      : []),
  ]

  return (
    <aside className="w-56 shrink-0 hidden md:block">
      <div className="card p-3 sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-600 px-3 mb-3">
          Navigation
        </p>
        <nav className="space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 px-3 py-1">
              Admin
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}
