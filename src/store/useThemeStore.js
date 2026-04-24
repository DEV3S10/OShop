/**
 * useThemeStore — global theme (dark/light) state
 *
 * Persists user preference to localStorage and applies
 * the 'dark' class to <html> so Tailwind dark mode works.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,

      toggleTheme: () => {
        const newVal = !get().isDark
        applyTheme(newVal)
        set({ isDark: newVal })
      },

      initTheme: () => {
        applyTheme(get().isDark)
      },
    }),
    {
      name: 'shopwave-theme',
    }
  )
)

export default useThemeStore
