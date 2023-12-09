'use client'
import { TextField, Button } from '@mui/material'
import { axiosInstance } from '@utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    axiosInstance
      .post('/auth/login', formData)
      .then((res) => {
        if (res.status == 200) {
          const data = res.data
          window.localStorage.setItem('token', data?.access ?? '')
          window.localStorage.setItem('refresh', data?.refresh ?? '')
          toast.success('Login sucess.')
          router.push('/')
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail ?? 'Something went wrong')
      })
  }
  return (
    <div className="h-[84vh] w-full flex items-center justify-center">
      <form className="grid grid-cols-1 gap-3 items-center p-3 w-1/3">
        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
          Login
        </Button>
      </form>
    </div>
  )
}
