import { PackageOpen, AlertCircle } from 'lucide-react'

export default function EmptyState({ title = 'No results', message = '', error = false }) {
  const Icon = error ? AlertCircle : PackageOpen
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <Icon size={48} className={error ? 'text-red-400' : 'text-stone-300 dark:text-stone-700'} />
      <p className={`font-semibold text-lg ${error ? 'text-red-500' : 'text-stone-400 dark:text-stone-600'}`}>
        {title}
      </p>
      {message && <p className="text-sm text-stone-400 dark:text-stone-600 max-w-xs">{message}</p>}
    </div>
  )
}
