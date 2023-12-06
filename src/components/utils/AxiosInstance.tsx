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

// Create an Axios instance with predefined settings
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  headers: getHeaders(),
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      // Clearing local storage and redirecting to login if token is invalid
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
        window.location.href = '/login' // Update with your login route
      }
    }
    return Promise.reject(error)
  }
)
