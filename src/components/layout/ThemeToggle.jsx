import { Sun, Moon } from 'lucide-react'
import useThemeStore from '../../store/useThemeStore'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore()
  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost p-2"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
