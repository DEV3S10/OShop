import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { Star, ShoppingCart, ArrowLeft, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const addItem = useCartStore((s) => s.addItem)
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  if (loading) return <div className="flex justify-center py-32"><Spinner size="lg" /></div>
  if (error || !product) return <EmptyState title="Product not found" error />

  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!')
  }

  return (
    <div className="animate-fade-in space-y-6">
      <Link to="/products" className="btn-ghost text-sm inline-flex">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="card overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="bg-stone-100 dark:bg-stone-800 p-8 flex items-center justify-center min-h-80">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-72 object-contain"
            />
          </div>

          {/* Info */}
          <div className="p-8 space-y-5">
            <div>
              <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 mb-3 inline-block capitalize">
                {product.category}
              </span>
              <h1 className="text-2xl font-black tracking-tight">{product.title}</h1>
              <p className="text-stone-500 dark:text-stone-400 mt-1">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-stone-600'}
                />
              ))}
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                {product.rating} ({product.stock} in stock)
              </span>
            </div>

            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-brand-600 dark:text-brand-400">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={handleAddToCart} className="btn-primary">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              {isAdmin && (
                <Link to={`/products/${id}/edit`} className="btn-secondary">
                  <Edit size={16} /> Edit Product
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Image gallery */}
        {product.images?.length > 1 && (
          <div className="border-t border-stone-200 dark:border-stone-800 p-6">
            <p className="text-sm font-semibold mb-3 text-stone-500 dark:text-stone-400">Gallery</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-xl border-2 border-stone-200 dark:border-stone-700 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
