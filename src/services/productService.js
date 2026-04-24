/**
 * productService.js — Product CRUD operations
 *
 * All product API calls go through here. This is the "services layer"
 * that keeps API logic out of components.
 *
 * Uses: https://dummyjson.com/products
 */
import api from './api'

export const productService = {
  /** GET /products?limit=&skip=&select= */
  getAll: async ({ limit = 20, skip = 0, search = '', category = '' } = {}) => {
    let url = `/products?limit=${limit}&skip=${skip}`
    if (search) url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`
    if (category && !search) url = `/products/category/${category}?limit=${limit}&skip=${skip}`
    const { data } = await api.get(url)
    return data // { products, total, skip, limit }
  },

  /** GET /products/:id */
  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  /** GET /products/categories */
  getCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data
  },

  /** POST /products/add */
  create: async (payload) => {
    const { data } = await api.post('/products/add', payload)
    return data
  },

  /** PUT /products/:id */
  update: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload)
    return data
  },

  /** DELETE /products/:id */
  remove: async (id) => {
    const { data } = await api.delete(`/products/${id}`)
    return data
  },
}
