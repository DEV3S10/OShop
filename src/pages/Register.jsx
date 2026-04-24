import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { authService } from '../services/authService'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

const validate = (v) => {
  const e = {}
  if (!v.firstName.trim()) e.firstName = 'First name is required'
  if (!v.lastName.trim()) e.lastName = 'Last name is required'
  if (!v.username.trim()) e.username = 'Username is required'
  if (!v.email.trim()) e.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(v.email)) e.email = 'Invalid email'
  if (!v.password || v.password.length < 6) e.password = 'Min 6 characters'
  return e
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { firstName: '', lastName: '', username: '', email: '', password: '' },
    validate
  )

  const onSubmit = async (vals) => {
    try {
      const user = await authService.register(vals)
      login({ ...user, role: 'user' }, 'local-token-' + Date.now())
      toast.success('Account created! Welcome.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    }
  }

  const fields = [
    { name: 'firstName', label: 'First Name', placeholder: 'Emily' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Smith' },
    { name: 'username', label: 'Username', placeholder: 'emilys', span: 2 },
    { name: 'email', label: 'Email', placeholder: 'emily@example.com', type: 'email', span: 2 },
    { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password', span: 2 },
  ]

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-black mb-1">Create account</h1>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Join ShopWave today</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {fields.map(({ name, label, placeholder, type = 'text', span }) => (
            <div key={name} className={span === 2 ? 'col-span-2' : ''}>
              <label className="label">{label}</label>
              <input name={name} type={type} value={values[name]} onChange={handleChange}
                className="input-field" placeholder={placeholder} />
              {errors[name] && <p className="error-text">{errors[name]}</p>}
            </div>
          ))}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center mt-2">
          {isSubmitting ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-center text-stone-500 dark:text-stone-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
