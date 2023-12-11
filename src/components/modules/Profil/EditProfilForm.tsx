'use client'
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { axiosInstance } from '@utils'

import { useRouter } from 'next/navigation'

import { useUserProfile } from '@contexts'

import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const EditProfilForm = () => {
  const { user } = useUserProfile()

  const userData = {
    nama: user?.nama ?? '', // Initialize fields properly
    foto: user?.foto ??'',
    nomor_telepon: user?.nomor_telepon ?? '',
  }

  const [formData, setFormData] = useState(userData)

  useEffect(() => {
    setFormData({
      nama: user?.nama ?? '',
      foto: user?.foto ?? '',
      nomor_telepon: user?.nomor_telepon ?? '',
    })
  }, [user])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    axiosInstance
      .post('/auth/edit', formData)
      .then((res) => {
        if (res.status == 200) {
          toast.success('Changes has been sucessfully made.')
          router.push('/profile')
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail ?? 'Something went wrong')
      })
  }
  return (
    <div className="my-2">
      <div className="flex mt-10 items-center flex-col gap-5">
        <Typography variant="h4" className="mb-2 font-bold">
          Profil Page
        </Typography>
      </div>

      <form className="grid grid-cols-1 gap-3 items-center p-3">
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
        <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
      </form>
    </div>
  )
}
