import ProductCard from './ProductCard'
import EmptyState from '../ui/EmptyState'

function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-square bg-stone-200 dark:bg-stone-800" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-16" />
          <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded w-20" />
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, error }) {
  if (error) return <EmptyState title="Failed to load" message={error} error />
  if (!loading && products.length === 0) return <EmptyState title="No products found" message="Try adjusting your search or filters." />

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)
      }
    </div>
  )
}
