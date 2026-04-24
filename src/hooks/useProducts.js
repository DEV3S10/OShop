/**
 * useProducts — custom hook for fetching paginated/filtered products
 *
 * Encapsulates loading, error, and pagination state.
 * Components just call this hook — no axios logic inside components.
 */
import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/productService'

const LIMIT = 12

export function useProducts({ search = '', category = '', sortBy = '', page = 1 } = {}) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const skip = (page - 1) * LIMIT

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAll({ limit: LIMIT, skip, search, category })
      let results = data.products || []

      // Client-side sort (dummyjson doesn't support sortBy in all endpoints)
      if (sortBy === 'price-asc') results = [...results].sort((a, b) => a.price - b.price)
      if (sortBy === 'price-desc') results = [...results].sort((a, b) => b.price - a.price)
      if (sortBy === 'rating') results = [...results].sort((a, b) => b.rating - a.rating)

      setProducts(results)
      setTotal(data.total || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [skip, search, category, sortBy])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { products, total, loading, error, refetch: fetch, limit: LIMIT }
}
