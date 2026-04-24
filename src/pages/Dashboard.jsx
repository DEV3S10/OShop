import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Star, TrendingUp, ArrowRight, Plus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import { productService } from '../services/productService'
import StatCard from '../components/dashboard/StatCard'
import Spinner from '../components/ui/Spinner'

const CHART_DATA = [
  { month: 'Jan', sales: 4200 }, { month: 'Feb', sales: 3800 },
  { month: 'Mar', sales: 5100 }, { month: 'Apr', sales: 4700 },
  { month: 'May', sales: 6200 }, { month: 'Jun', sales: 5800 },
  { month: 'Jul', sales: 7100 }, { month: 'Aug', sales: 6900 },
]

export default function Dashboard() {
  const { user } = useAuthStore()
  const cartItems = useCartStore((s) => s.items)
  const cartTotal = useCartStore((s) => s.total())
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getAll({ limit: 5 }).then((d) => {
      setRecentProducts(d.products || [])
      setLoading(false)
    })
  }, [])

  const isAdmin = user?.role === 'admin'

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            Welcome back, <span className="font-semibold text-stone-700 dark:text-stone-300">{user?.firstName || user?.username}</span> 👋
          </p>
        </div>
        {isAdmin && (
          <Link to="/products/create" className="btn-primary">
            <Plus size={16} /> New Product
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Cart Items" value={cartItems.length} icon={ShoppingCart} color="brand" />
        <StatCard label="Cart Total" value={`$${cartTotal.toFixed(2)}`} icon={TrendingUp} color="green" />
        <StatCard label="Browsed" value="—" icon={Package} color="blue" />
        <StatCard label="Avg Rating" value="4.6" icon={Star} color="purple" />
      </div>

      {/* Chart */}
      <div className="card p-6">
        <h2 className="section-title mb-6">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={CHART_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Syne' }} />
            <YAxis tick={{ fontSize: 12, fontFamily: 'Syne' }} />
            <Tooltip
              contentStyle={{
                fontFamily: 'Syne', borderRadius: '12px',
                border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent products */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">Recent Products</h2>
          <Link to="/products" className="btn-ghost text-sm">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : (
          <div className="space-y-3">
            {recentProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <img src={p.thumbnail} alt={p.title} className="w-12 h-12 rounded-xl object-cover bg-stone-100 dark:bg-stone-800" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {p.title}
                  </p>
                  <p className="text-xs text-stone-400 dark:text-stone-600 capitalize">{p.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-brand-600 dark:text-brand-400">${p.price}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs text-stone-400">{p.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Cart summary */}
      {cartItems.length > 0 && (
        <div className="card p-6">
          <h2 className="section-title mb-4">Your Cart</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.thumbnail} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                <p className="flex-1 text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-stone-400">×{item.qty}</p>
                <p className="font-bold text-sm text-brand-600 dark:text-brand-400">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 dark:border-stone-800 mt-4 pt-4 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-black text-brand-600 dark:text-brand-400">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
