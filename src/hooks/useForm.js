/**
 * useForm — reusable form state + validation hook
 *
 * Usage:
 *   const { values, errors, handleChange, handleSubmit, setFieldError } = useForm(initialValues, validate)
 */
import { useState, useCallback } from 'react'

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault()
      const validationErrors = validate ? validate(values) : {}
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate]
  )

  return { values, errors, isSubmitting, handleChange, handleSubmit, setFieldError, reset, setValues }
}
