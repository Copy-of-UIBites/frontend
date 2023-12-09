import { axiosInstance } from '@utils'
import React from 'react'
import { Kantin } from './type'
import { Button } from '@mui/material'
import { KantinDetail } from './KantinDetail'

export const OwnerKantinProfile = async () => {
  const res = await axiosInstance.get('/auth/kantin/me')
  const data = res.data as Kantin

  return (
    <div>
      <div>
        <KantinDetail kantin={data} addToFavorites={false} />
        <Button
          className="flex justify-end"
          variant="outlined"
          // TODO: handle edit
        >
          Edit
        </Button>
      </div>
    </div>
  )
}
