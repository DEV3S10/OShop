import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import ProductGrid from '../components/product/ProductGrid'
import Pagination from '../components/ui/Pagination'
import { Search, SlidersHorizontal } from 'lucide-react'

const CATEGORIES = [
  'all', 'smartphones', 'laptops', 'fragrances', 'skincare',
  'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses',
]

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 400)

  const { products, total, loading, error, limit } = useProducts({
    search: debouncedSearch, category, sortBy, page,
  })

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }
  const handleCategory = (cat) => { setCategory(cat === 'all' ? '' : cat); setPage(1) }
  const handleSort = (e) => { setSortBy(e.target.value); setPage(1) }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="page-title">Products</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm">{total} items found</p>
      </div>

      {/* Filters */}
      <div className="card p-4 space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search products…"
              className="input-field pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-stone-400" />
            <select value={sortBy} onChange={handleSort} className="input-field w-auto">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = (cat === 'all' && !category) || cat === category
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                  active
                    ? 'bg-brand-500 text-white shadow'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <ProductGrid products={products} loading={loading} error={error} />
      <Pagination page={page} total={total} limit={limit} onChange={setPage} />
    </div>
  )
}
