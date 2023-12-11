'use client'
import { MultiTextfield } from '@elements'
import { TextField, Button } from '@mui/material'
import { axiosInstance } from '@utils'
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { AddMenuField } from './AddMenuField'
import { Kantin, Menu } from './type'
import { useRouter } from 'next/navigation'

interface EditKantinFormProps {
  kantin: Kantin
  setIsEdit: (value: boolean) => void
}
export const EditKantinForm: FC<EditKantinFormProps> = ({
  kantin,
  setIsEdit,
}) => {
  const [formData, setFormData] = useState({ ...kantin })
  const [menuList, setMenuList] = useState<Menu[]>(kantin.menu)
  const [fotoUrls, setFotoUrls] = useState<string[]>(kantin.list_foto)
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

    axiosInstance
      .post('/kantin/edit', formData)
      .then((res) => {
        if (res.status == 200) {
          toast.success('Kantin updated!')
          setIsEdit(false)
          router.refresh()
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail ?? 'Something went wrong')
      })
  }
  return (
    <div>
      <p className="text-2xl font-bold text-center leading-loose">
        Edit Kantin
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
        />
        <TextField
          id="outlined-basic"
          label="Lokasi"
          name="lokasi"
          variant="outlined"
          value={formData.lokasi}
          onChange={handleChange}
          disabled
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
        />
        <MultiTextfield
          label="Foto kantin"
          fields={fotoUrls}
          setFields={setFotoUrls}
        />
        <AddMenuField fields={menuList} setFields={setMenuList} />

        <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
          Edit Kantin
        </Button>
      </form>
    </div>
  )
}
