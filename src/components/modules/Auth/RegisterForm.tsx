'use client'
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { axiosInstance } from '@utils'

import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import toast from 'react-hot-toast'

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nama: '',
    foto: '',
    nomor_telepon: '',
    role: 'User', // Default value
    is_admin: false,
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
    if (formData.role == 'Admin') {
      formData.is_admin = true
    }
    axiosInstance
      .post('/auth/register', formData)
      .then((res) => {
        if (res.status == 200) {
          toast.success('Registration sucess.')
          router.push('/login')
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail ?? 'Something went wrong')
      })
  }
  return (
    <div className="my-2">
      <form className="grid grid-cols-1 gap-3 items-center p-3">
        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          value={formData.email}
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
        <TextField
          id="outlined-basic"
          label="Nama"
          name="nama"
          variant="outlined"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Nomor Telepon"
          name="nomor_telepon"
          variant="outlined"
          value={formData.nomor_telepon}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Foto"
          name="foto"
          variant="outlined"
          value={formData.foto}
          onChange={handleChange}
          required
        />
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <FormControlLabel value="User" control={<Radio />} label="Pengguna" />
          <FormControlLabel
            value="Pemilik Kantin"
            control={<Radio />}
            label="Pemilik Kantin"
          />
          <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
        </RadioGroup>
        <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
          Register
        </Button>
      </form>
    </div>
  )
}
