/**
 * authService.js — Authentication API calls
 *
 * Uses dummyjson.com's auth endpoint.
 * Returns a token and user object on successful login.
 */
import api from './api'

export const authService = {
  /**
   * Login with username + password.
   * DummyJSON returns { token, id, username, email, firstName, lastName, image }
   */
  login: async ({ username, password }) => {
    const { data } = await api.post('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    })
    return data
  },

  /**
   * Get current user profile (requires token).
   */
  getMe: async () => {
    const { data } = await api.get('/auth/me')
    return data
  },

  /**
   * Register is simulated locally (dummyjson doesn't persist new users).
   * In a real app this would POST to /auth/register.
   */
  register: async (payload) => {
    // Simulate a successful register response
    await new Promise((r) => setTimeout(r, 800))
    return {
      id: Date.now(),
      username: payload.username,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: 'user',
    }
  },
}
