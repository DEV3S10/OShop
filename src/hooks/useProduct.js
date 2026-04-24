/**
 * useProduct — fetch a single product by ID
 */
import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    productService
      .getById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
