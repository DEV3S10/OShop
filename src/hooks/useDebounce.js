/**
 * useDebounce — delays updating a value until user stops typing
 *
 * Used in search inputs to avoid firing an API call on every keystroke.
 */
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
