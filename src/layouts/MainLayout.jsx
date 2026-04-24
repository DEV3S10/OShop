import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200 dark:border-stone-800 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
        © {new Date().getFullYear()} OShop. Built with React + Vite.
      </footer>
    </div>
  )
}
