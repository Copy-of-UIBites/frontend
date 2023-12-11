export const validateForm = (formData: any) => {
  const hasEmptyField = Object.values(formData).some((field) => {
    if (typeof field === 'string') {
      // Check if string field is empty (blank or whitespace)
      return field.trim() === ''
    } else if (Array.isArray(field)) {
      // Check if array field is empty
      return field.length === 0
    } else if (typeof field === 'number' || typeof field === 'boolean') {
      // Check if number or boolean field is undefined
      return field === undefined
    } else {
      // For other types, consider them non-empty
      return false
    }
  })

  return !hasEmptyField // Return true if there are no empty fields
}
