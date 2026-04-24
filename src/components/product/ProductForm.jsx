import { useForm } from '../../hooks/useForm'

const validate = (v) => {
  const e = {}
  if (!v.title?.trim()) e.title = 'Title is required'
  if (!v.price || isNaN(v.price) || Number(v.price) <= 0) e.price = 'Valid price required'
  if (!v.description?.trim()) e.description = 'Description is required'
  if (!v.category?.trim()) e.category = 'Category is required'
  if (!v.stock || isNaN(v.stock)) e.stock = 'Stock is required'
  return e
}

const DEFAULTS = { title: '', price: '', description: '', category: '', stock: '', brand: '', thumbnail: '' }

export default function ProductForm({ initial = {}, onSubmit, isSubmitting }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { ...DEFAULTS, ...initial },
    validate
  )

  const fields = [
    { name: 'title', label: 'Product Title', placeholder: 'iPhone 15 Pro', span: 2 },
    { name: 'brand', label: 'Brand', placeholder: 'Apple' },
    { name: 'category', label: 'Category', placeholder: 'smartphones' },
    { name: 'price', label: 'Price ($)', placeholder: '999', type: 'number' },
    { name: 'stock', label: 'Stock', placeholder: '50', type: 'number' },
    { name: 'thumbnail', label: 'Thumbnail URL', placeholder: 'https://...', span: 2 },
    { name: 'description', label: 'Description', placeholder: 'Product description...', span: 2, textarea: true },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ name, label, placeholder, type = 'text', span, textarea }) => (
          <div key={name} className={span === 2 ? 'col-span-2' : ''}>
            <label className="label">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={values[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={3}
                className="input-field resize-none"
              />
            ) : (
              <input
                name={name}
                type={type}
                value={values[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="input-field"
              />
            )}
            {errors[name] && <p className="error-text">{errors[name]}</p>}
          </div>
        ))}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
        {isSubmitting ? 'Saving…' : 'Save Product'}
      </button>
    </form>
  )
}
