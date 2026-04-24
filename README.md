# 🛍️ OShop — Production React E-Commerce SPA

A modern, production-ready e-commerce frontend built with **React 18 + Vite + TailwindCSS + Zustand**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → Open http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🔐 Demo Credentials (dummyjson.com)

| Role  | Username   | Password       | Access                              |
|-------|-----------|----------------|-------------------------------------|
| Admin | `emilys`  | `emilyspass`   | Full access: admin, create, edit    |
| User  | `michaelw`| `michaelwpass` | Dashboard + profile only            |

---

## 📁 Project Structure

```
src/
├── store/              ← Zustand global state (auth, theme, cart)
│   ├── useAuthStore.js
│   ├── useThemeStore.js
│   └── useCartStore.js
├── services/           ← All API calls (axios)
│   ├── api.js          ← Axios instance + interceptors
│   ├── authService.js
│   └── productService.js
├── hooks/              ← Custom React hooks
│   ├── useProducts.js
│   ├── useProduct.js
│   ├── useDebounce.js
│   └── useForm.js
├── routes/
│   └── ProtectedRoute.jsx
├── layouts/
│   ├── MainLayout.jsx
│   ├── DashboardLayout.jsx
│   └── AuthLayout.jsx
├── components/
│   ├── ui/             ← Reusable UI components
│   ├── layout/         ← Navbar, Sidebar, ThemeToggle
│   ├── product/        ← ProductCard, ProductGrid, ProductForm
│   └── dashboard/      ← StatCard
├── pages/              ← One file per route
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AdminPanel.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── CreateProduct.jsx
│   ├── EditProduct.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
└── App.jsx             ← Route tree
```

---

## 🌐 Pages & Routes

| Route                  | Page            | Auth Required | Admin Only |
|------------------------|-----------------|---------------|------------|
| `/`                    | Home            | ❌            | ❌         |
| `/products`            | Products List   | ❌            | ❌         |
| `/products/:id`        | Product Detail  | ❌            | ❌         |
| `/login`               | Login           | ❌            | ❌         |
| `/register`            | Register        | ❌            | ❌         |
| `/dashboard`           | Dashboard       | ✅            | ❌         |
| `/profile`             | Profile         | ✅            | ❌         |
| `/admin`               | Admin Panel     | ✅            | ✅         |
| `/products/create`     | Create Product  | ✅            | ✅         |
| `/products/:id/edit`   | Edit Product    | ✅            | ✅         |
| `*`                    | 404 Not Found   | ❌            | ❌         |

---

## 🛠️ Tech Stack

- **React 18** — functional components + hooks
- **Vite** — fast dev server + build tool
- **React Router v6** — routing + protected routes
- **Zustand** — global state with localStorage persistence
- **Axios** — HTTP client with request/response interceptors
- **TailwindCSS** — utility-first styling + dark mode
- **Recharts** — dashboard bar chart
- **react-hot-toast** — toast notifications
- **lucide-react** — icons
- **DummyJSON API** — mock REST API

---

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
`vercel.json` is already included for client-side routing.

### Netlify
Drag-and-drop the `dist/` folder, or connect your repo.  
`public/_redirects` is already included.

### GitHub Pages
```js
// vite.config.js — add base
export default defineConfig({ base: '/your-repo-name/', ... })
```

---

## 🎨 Features

- ✅ Product browsing with search, filter by category, sort by price/rating
- ✅ Pagination
- ✅ Product detail page with image gallery
- ✅ Shopping cart (persisted to localStorage)
- ✅ Login & Register forms with validation
- ✅ Protected routes (auth + role-based)
- ✅ Admin panel with product table, search, delete confirmation modal
- ✅ Create & Edit product forms
- ✅ Dashboard with bar chart and recent products
- ✅ User profile with inline editing
- ✅ Dark / Light theme toggle (persisted)
- ✅ Loading skeletons
- ✅ Empty states & error states
- ✅ Toast notifications
- ✅ Responsive layout (mobile-first)
- ✅ Custom hooks: useForm, useProducts, useProduct, useDebounce
