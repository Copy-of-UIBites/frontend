'use client'
import { axiosInstance } from '@utils'
import React, { useState } from 'react'
import { Kantin } from './type'
import { Button } from '@mui/material'
import { KantinDetail } from './KantinDetail'
import { EditKantinForm } from './EditKantinForm'

export const OwnerKantinProfile = async () => {
  const res = await axiosInstance.get('/auth/kantin/me')
  const data = res.data as Kantin

  const [isEdit, setIsEdit] = useState<boolean>(false)

  return (
    <div>
      <div>
        {!isEdit ? (
          <div>
            <KantinDetail kantin={data} addToFavorites={false} />
            <Button
              className="flex justify-end"
              variant="outlined"
              onClick={() => {
                setIsEdit(isEdit)
              }}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <EditKantinForm kantin={data} setIsEdit={setIsEdit} />
          </div>
        )}
      </div>
    </div>
  )
}
