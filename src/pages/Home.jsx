import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, RefreshCw } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import Spinner from '../components/ui/Spinner'

const features = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Same-day shipping on thousands of items.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Your data is always encrypted & safe.' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
]

export default function Home() {
  const { products, loading } = useProducts({ limit: 8 })

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500 to-orange-600 text-white p-12 sm:p-20">
        <div className="relative z-10 max-w-xl">
          <p className="text-brand-100 font-semibold tracking-widest text-sm uppercase mb-4">New Season Arrivals</p>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight mb-6">
            Shop the<br />Future Today
          </h1>
          <p className="text-brand-100 text-lg mb-8 leading-relaxed">
            Discover thousands of products at unbeatable prices. Quality guaranteed.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors">
            Browse Products <ArrowRight size={18} />
          </Link>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute right-20 bottom-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2" />
      </section>

      {/* Features */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 flex gap-4 items-start">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="page-title">Featured Products</h2>
          <Link to="/products" className="btn-ghost text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  )
}
