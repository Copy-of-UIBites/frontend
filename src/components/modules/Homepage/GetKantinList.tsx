import { axiosInstance } from '@utils'
import React from 'react'
import { Kantin } from '../Kantin/type'
import { Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import {
  BuildingStorefrontIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

export const GetKantinList = async () => {
  const res = await axiosInstance.get('/kantin/list')
  const data = res.data as Kantin[]
  console.log(data)
  return (
    <div className="flex flex-wrap items-start justify-start gap-6 px-4">
      {data
        ?.filter((item) => item.status_verifikasi == 'Terverifikasi')
        .map(
          ({ nama, lokasi, deskripsi, list_foto, status_verifikasi }, idx) => {
            return (
              <Card key={idx} className="px-4 py-4 h-72 w-64 rounded-lg">
                <CardContent className="flex flex-col gap-4">
                  <Typography variant="h5" component="div">
                    {nama}
                  </Typography>
                  <div>
                    {list_foto?.slice(0, 1).map((foto, index) => (
                      <Image
                        key={index}
                        src={foto}
                        alt={`foto-${index}`}
                        className="w-full mx-auto object-cover"
                        width={40}
                        height={40}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    ))}
                  </div>
                  <Typography color="text.secondary">
                    <span>
                      <BuildingStorefrontIcon className="w-5" />
                    </span>
                    {lokasi}
                  </Typography>
                  <Typography variant="body2">
                    <span>
                      <InformationCircleIcon className="w-5" />
                    </span>
                    {deskripsi}
                  </Typography>
                </CardContent>
              </Card>
            )
          }
        )}
    </div>
  )
}
