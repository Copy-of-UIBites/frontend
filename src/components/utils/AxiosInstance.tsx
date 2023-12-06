import axios from 'axios'

// Function to get the token and return headers
const getHeaders = () => {
  let token
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token')
  }
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  } else {
    return {
      'Content-Type': 'application/json',
    }
  }
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: getHeaders(),
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
