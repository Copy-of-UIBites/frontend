import React, { FC } from 'react'
import { Kantin } from './type'
import { Typography, Button } from '@mui/material'

interface KantinShortDetailProps {
  kantin: Kantin
}

export const KantinShortDetail: FC<KantinShortDetailProps> = ({ kantin }) => {
  const { id, nama, lokasi, deskripsi } = kantin

  const handleSeeDetails = () => {
    window.location.href = `/kantin/${id}`
  }

  return (
    <div className="p-5 border border-solid border-gray-300 rounded mb-5 font-sans text-center">
      <Typography variant="h5" className="mb-3">
        {nama}
      </Typography>
      <Typography variant="subtitle1" className="mb-3">
        Lokasi: {lokasi}
      </Typography>
      <Typography variant="body1" className="mb-3">
        Deskripsi: {deskripsi}
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleSeeDetails}>
        See Details
      </Button>
    </div>
  )
}
