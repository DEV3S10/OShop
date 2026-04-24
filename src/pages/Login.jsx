import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { authService } from '../services/authService'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

const validate = (v) => {
  const e = {}
  if (!v.username.trim()) e.username = 'Username is required'
  if (!v.password.trim()) e.password = 'Password is required'
  return e
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { username: '', password: '' },
    validate
  )
  const from = location.state?.from?.pathname || '/dashboard'

  const onSubmit = async (vals) => {
    try {
      const data = await authService.login(vals)
      const role = vals.username === 'emilys' ? 'admin' : 'user'
      login({ ...data, role }, data.token)
      toast.success(`Welcome back, ${data.firstName}!`)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Invalid credentials')
    }
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-black mb-1">Welcome back</h1>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Username</label>
          <input name="username" value={values.username} onChange={handleChange}
            className="input-field" placeholder="emilys" autoComplete="username" />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>
        <div>
          <label className="label">Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange}
            className="input-field" placeholder="••••••••" autoComplete="current-password" />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center mt-2">
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs text-stone-500 dark:text-stone-400 space-y-1">
        <p className="font-semibold text-stone-600 dark:text-stone-300">Demo Credentials:</p>
        <p>Admin: <code className="font-mono">emilys</code> / <code className="font-mono">emilyspass</code></p>
        <p>User: <code className="font-mono">michaelw</code> / <code className="font-mono">michaelwpass</code></p>
      </div>

      <p className="text-sm text-center text-stone-500 dark:text-stone-400 mt-6">
        No account?{' '}
        <Link to="/register" className="text-brand-500 font-semibold hover:underline">Register</Link>
      </p>
    </div>
  )
}
