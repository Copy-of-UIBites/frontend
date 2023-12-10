'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'

import { EditKantinForm } from './EditKantinForm'

import { axiosInstance } from '@utils'
import { Kantin } from './type'
import { KantinDetail } from './KantinDetail'
import { useRouter } from 'next/navigation'

export const OwnerKantinProfile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [kantinData, setKantinData] = useState<Kantin | null>(null)
  const router = useRouter()
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
            <KantinDetail kantin={kantinData} addToFavorites={false} />
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
        ) : !!kantinData && isEdit ? (
          <div className="py-2">
            <EditKantinForm kantin={kantinData} setIsEdit={setIsEdit} />
          </div>
        ) : (
          !kantinData && (
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push('/kantin/register')
                }}
              >
                Register Kantin
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
