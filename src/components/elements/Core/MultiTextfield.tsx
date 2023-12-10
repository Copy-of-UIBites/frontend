'use client'

import { Grid, TextField, Button } from '@mui/material'
import { FormLabel } from '@mui/material'
import { FC } from 'react'
interface MultiTextfieldProps {
  label: string
  fields: string[]
  setFields: (value: string[]) => void
}
export const MultiTextfield: FC<MultiTextfieldProps> = ({
  label,
  fields,
  setFields,
}) => {
  const handleAddField = () => {
    setFields([...fields, ''])
  }

  const handleChange = (index: number, event: any) => {
    const values = [...fields]
    values[index] = event.target.value
    setFields(values)
  }

  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <FormLabel>{label}</FormLabel>
      {fields.map((field, index) => (
        <Grid key={index}>
          <Grid item xs={10} padding={1}>
            <TextField
              fullWidth
              label={`Field ${index + 1}`}
              value={field}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={handleAddField}>
        Add Field
      </Button>
    </div>
  )
}
