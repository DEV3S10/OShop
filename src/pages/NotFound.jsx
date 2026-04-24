import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-stone-50 dark:bg-stone-950">
      <div className="text-center max-w-md animate-fade-in">
        <p className="text-[120px] font-black leading-none text-brand-500 opacity-20 select-none">404</p>
        <h1 className="text-3xl font-black mt-[-20px] mb-3">Page Not Found</h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link to="/" className="btn-primary">
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  )
}
