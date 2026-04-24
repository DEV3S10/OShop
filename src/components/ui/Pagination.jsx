import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="btn-secondary px-3 py-2 disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
        const p = i + 1
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-xl font-semibold text-sm transition-all ${
              page === p
                ? 'bg-brand-500 text-white shadow'
                : 'btn-secondary px-0'
            }`}
          >
            {p}
          </button>
        )
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="btn-secondary px-3 py-2 disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
