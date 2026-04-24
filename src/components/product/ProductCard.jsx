import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import useCartStore from '../../store/useCartStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.title.slice(0, 20)}… added to cart`)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="card group flex flex-col overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 badge bg-brand-500 text-white text-[10px] px-2 py-1">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-600">
          {product.category}
        </p>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mt-auto">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
            {product.rating?.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-xs px-3 py-1.5 gap-1"
          >
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>
    </Link>
  )
}
