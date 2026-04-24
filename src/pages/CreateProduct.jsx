import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { productService } from '../services/productService'
import ProductForm from '../components/product/ProductForm'
import toast from 'react-hot-toast'

export default function CreateProduct() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
      }
      await productService.create(payload)
      toast.success('Product created!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.message || 'Failed to create product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <Link to="/admin" className="btn-ghost text-sm inline-flex">
        <ArrowLeft size={16} /> Back to Admin
      </Link>

      <div>
        <h1 className="page-title">Create Product</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Add a new product to the store</p>
      </div>

      <div className="card p-6">
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
