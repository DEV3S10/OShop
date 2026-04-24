/**
 * api.js — Axios instance
 *
 * Centralized HTTP client. Automatically attaches the auth token
 * to every request and handles 401 responses globally.
 */
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    // Read persisted auth store from localStorage
    try {
      const raw = localStorage.getItem('shopwave-auth')
      if (raw) {
        const { state } = JSON.parse(raw)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      }
    } catch (_) {}
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default api
