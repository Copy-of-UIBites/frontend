import { Button, FormLabel, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Menu } from './type'

interface AddMenuFieldProps {
  fields: Menu[]
  setFields: (menus: Menu[]) => void
}
export const AddMenuField: FC<AddMenuFieldProps> = ({ fields, setFields }) => {
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        nama: '',
        deskripsi: '',
        harga: 0,
      },
    ])
  }

  const handleChange = (index: number, event: any) => {
    if (event.target && event.target.name) {
      const values = [...fields]
      values[index] = {
        ...fields[index],
        [event.target.name]: event.target.value,
      }
      setFields(values)
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <FormLabel>Menus</FormLabel>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-row gap-4">
          <TextField
            id="outlined-basic"
            label="Nama"
            name="nama"
            variant="outlined"
            value={field.nama}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Deskripsi"
            name="deskripsi"
            variant="outlined"
            value={field.deskripsi}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Harga"
            name="harga"
            variant="outlined"
            type="number"
            value={field.harga}
            onChange={(e) => handleChange(index, e)}
            multiline
            required
          />
        </div>
      ))}
      <Button variant="outlined" className="py-4" onClick={handleAddField}>
        Add Field
      </Button>
    </div>
  )
}
