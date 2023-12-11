'use client'
import { MultiTextfield } from '@elements'
import { Button, TextField } from '@mui/material'
import { axiosInstance, validateForm } from '@utils'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AddMenuField } from './AddMenuField'
import { Menu } from './type'

export const RegisterKantinForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    lokasi: '',
    deskripsi: '',
    list_foto: [''],
    menu: [{}],
  })
  const [menuList, setMenuList] = useState<Menu[]>([])
  const [fotoUrls, setFotoUrls] = useState<string[]>([])
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

    formData.list_foto = fotoUrls
    formData.menu = menuList
    if (validateForm(formData)) {
      axiosInstance
        .post('/kantin/register', formData)
        .then((res) => {
          if (res.status == 201) {
            toast.success('Registration sucess.')
            router.push('/kantin/me')
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.detail ?? 'Something went wrong')
        })
    }
  }
  return (
    <div className="my-2 py-10">
      <p className="text-2xl font-bold text-center leading-loose">
        Register Kantin
      </p>
      <form className="grid grid-cols-1 gap-4 items-center p-3">
        <TextField
          id="outlined-basic"
          label="Nama"
          name="nama"
          variant="outlined"
          value={formData.nama}
          onChange={handleChange}
          required
          error={!formData.nama}
        />
        <TextField
          id="outlined-basic"
          label="Lokasi"
          name="lokasi"
          variant="outlined"
          value={formData.lokasi}
          onChange={handleChange}
          required
          error={!formData.lokasi}
        />
        <TextField
          id="outlined-basic"
          label="Deskripsi"
          name="deskripsi"
          variant="outlined"
          value={formData.deskripsi}
          onChange={handleChange}
          multiline
          required
          error={!formData.deskripsi}
        />
        <MultiTextfield
          label="Foto kantin"
          fields={fotoUrls}
          setFields={setFotoUrls}
        />
        <AddMenuField fields={menuList} setFields={setMenuList} />
        <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
          Register Kantin
        </Button>
      </form>
    </div>
  )
}
