import { Outlet, Link } from 'react-router-dom'
import ThemeToggle from '../components/layout/ThemeToggle'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 to-orange-50 dark:from-stone-950 dark:to-stone-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-3xl font-black tracking-tight text-brand-500">ShopWave</span>
        </Link>
        <div className="card p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
