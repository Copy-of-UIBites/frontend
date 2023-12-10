'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'

import { EditKantinForm } from './EditKantinForm'

import { axiosInstance } from '@utils'
import { Kantin } from './type'
import { KantinDetail } from './KantinDetail'

export const OwnerKantinProfile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [kantinData, setKantinData] = useState<Kantin | null>(null)

  useEffect(() => {
    axiosInstance.get('/auth/kantin/me').then((res) => {
      if (res.status == 200) {
        const data = res.data as Kantin
        setKantinData(data)
      }
    })
  }, [])

  return (
    <div>
      <div>
        {!!kantinData && !isEdit ? (
          <div>
            <KantinDetail kantin={kantinData} />
            <Button
              className="flex my-4"
              variant="outlined"
              onClick={() => {
                setIsEdit(!isEdit)
              }}
            >
              Edit
            </Button>
          </div>
        ) : (
          !!kantinData && (
            <div className="py-2">
              <EditKantinForm kantin={kantinData} setIsEdit={setIsEdit} />
            </div>
          )
        )}
      </div>
    </div>
  )
}
