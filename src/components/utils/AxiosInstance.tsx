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