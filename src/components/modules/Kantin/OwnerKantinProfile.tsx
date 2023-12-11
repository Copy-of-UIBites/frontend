'use client'

import React, { useEffect, useState } from 'react'

import { Button, Typography } from '@mui/material'

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

  const handleDelete = () => {
    axiosInstance.delete('/auth/kantin/me').then((res) => {
      if (res.status == 200) {
      }
    })
  }

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
              disabled={kantinData.status_verifikasi == 'Tidak terverifikasi'}
            >
              Edit
            </Button>
            {kantinData.status_verifikasi == 'Tidak terverifikasi' && (
              <div className="flex flex-col gap-3">
                <Typography variant="body1">
                  Kantin tidak terverifikasi, hapus kantin untuk registrasi
                  kantin baru.
                </Typography>
                <Button
                  className="flex my-1"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleDelete()
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
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
