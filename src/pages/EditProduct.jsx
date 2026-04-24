import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProduct } from '../hooks/useProduct'
import { productService } from '../services/productService'
import ProductForm from '../components/product/ProductForm'
import Spinner from '../components/ui/Spinner'
import toast from 'react-hot-toast'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error } = useProduct(id)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
      }
      await productService.update(id, payload)
      toast.success('Product updated!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.message || 'Failed to update product')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="flex justify-center py-32"><Spinner size="lg" /></div>
  if (error) return <p className="text-red-500">Failed to load product: {error}</p>

  const initial = {
    title: product.title || '',
    price: String(product.price || ''),
    description: product.description || '',
    category: product.category || '',
    stock: String(product.stock || ''),
    brand: product.brand || '',
    thumbnail: product.thumbnail || '',
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <Link to="/admin" className="btn-ghost text-sm inline-flex">
        <ArrowLeft size={16} /> Back to Admin
      </Link>

      <div>
        <h1 className="page-title">Edit Product</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Update details for "{product.title}"</p>
      </div>

      <div className="card p-6">
        <ProductForm initial={initial} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
