import { useState } from 'react'
import { User, Mail, AtSign, Shield, ShoppingBag, Pencil, Check } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import useThemeStore from '../store/useThemeStore'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, updateUser } = useAuthStore()
  const cartCount = useCartStore((s) => s.count())
  const { isDark, toggleTheme } = useThemeStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const handleSave = () => {
    updateUser(form)
    setEditing(false)
    toast.success('Profile updated!')
  }

  const info = [
    { icon: User, label: 'Name', value: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || '—' },
    { icon: AtSign, label: 'Username', value: user?.username || '—' },
    { icon: Mail, label: 'Email', value: user?.email || '—' },
    { icon: Shield, label: 'Role', value: user?.role || 'user' },
    { icon: ShoppingBag, label: 'Cart Items', value: String(cartCount) },
  ]

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <h1 className="page-title">My Profile</h1>

      {/* Avatar + name */}
      <div className="card p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-3xl font-black">
          {(user?.firstName?.[0] || user?.username?.[0] || '?').toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-black">
            {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
          </h2>
          <span className={`badge mt-1 ${user?.role === 'admin' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}>
            {user?.role || 'user'}
          </span>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="btn-secondary ml-auto text-sm"
        >
          {editing ? <><Check size={14} /> Done</> : <><Pencil size={14} /> Edit</>}
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="card p-6 space-y-4 animate-slide-up">
          <h2 className="section-title">Edit Information</h2>
          {[
            { key: 'firstName', label: 'First Name' },
            { key: 'lastName', label: 'Last Name' },
            { key: 'email', label: 'Email', type: 'email' },
          ].map(({ key, label, type = 'text' }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={handleSave} className="btn-primary">Save Changes</button>
        </div>
      )}

      {/* Info list */}
      <div className="card divide-y divide-stone-100 dark:divide-stone-800">
        {info.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 p-4">
            <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
              <Icon size={16} className="text-stone-500 dark:text-stone-400" />
            </div>
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-600 font-medium">{label}</p>
              <p className="font-semibold capitalize">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div className="card p-6 space-y-4">
        <h2 className="section-title">Preferences</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Dark Mode</p>
            <p className="text-xs text-stone-400 dark:text-stone-600">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDark ? 'bg-brand-500' : 'bg-stone-300'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isDark ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
