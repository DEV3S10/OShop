import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Star, Search } from 'lucide-react'
import { productService } from '../services/productService'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import Pagination from '../components/ui/Pagination'
import toast from 'react-hot-toast'

const LIMIT = 10

export default function AdminPanel() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productService.getAll({ limit: LIMIT, skip: (page - 1) * LIMIT, search })
      setProducts(data.products || [])
      setTotal(data.total || 0)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await productService.remove(deleteId)
      toast.success('Product deleted')
      setDeleteId(null)
      fetchProducts()
    } catch {
      toast.error('Delete failed')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{total} total products</p>
        </div>
        <Link to="/products/create" className="btn-primary">
          <Plus size={16} /> New Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search products…"
          className="input-field pl-9 max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <th className="text-left p-4 font-semibold text-stone-500 dark:text-stone-400">Product</th>
                  <th className="text-left p-4 font-semibold text-stone-500 dark:text-stone-400 hidden sm:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold text-stone-500 dark:text-stone-400">Price</th>
                  <th className="text-left p-4 font-semibold text-stone-500 dark:text-stone-400 hidden md:table-cell">Rating</th>
                  <th className="text-left p-4 font-semibold text-stone-500 dark:text-stone-400 hidden md:table-cell">Stock</th>
                  <th className="text-right p-4 font-semibold text-stone-500 dark:text-stone-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnail} alt={p.title} className="w-10 h-10 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 flex-shrink-0" />
                        <div>
                          <p className="font-semibold line-clamp-1">{p.title}</p>
                          <p className="text-xs text-stone-400 dark:text-stone-600">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="badge bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 capitalize px-2 py-1">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-brand-600 dark:text-brand-400">${p.price}</td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{p.rating}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`badge px-2 py-1 ${p.stock > 20 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/products/${p.id}/edit`} className="btn-ghost p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => setDeleteId(p.id)} className="btn-ghost p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination page={page} total={total} limit={LIMIT} onChange={setPage} />

      {/* Delete modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
          <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
