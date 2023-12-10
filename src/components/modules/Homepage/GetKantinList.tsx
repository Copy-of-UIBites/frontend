import { axiosInstance } from '@utils'
import React from 'react'
import { Kantin } from '../Kantin/type'
import { Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import {
  BuildingStorefrontIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export const GetKantinList = async () => {
  const res = await axiosInstance.get('/kantin/list')
  const data = res.data as Kantin[]

  return (
    <div className="flex flex-wrap items-start justify-start gap-6 px-4">
      {data
        ?.filter((item) => item.status_verifikasi == 'Terverifikasi')
        .map(
          (
            { id, nama, lokasi, deskripsi, list_foto, status_verifikasi },
            idx
          ) => {
            return (
              <Link href={`/kantin/${id}`} key={idx}>
                <Card className="px-4 py-4 h-72 w-64 rounded-lg">
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
                    <Typography
                      color="text.secondary"
                      className="flex flex-row gap-2 items-centr"
                    >
                      <span>
                        <BuildingStorefrontIcon className="w-5" />
                      </span>
                      {lokasi}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="flex flex-row gap-2 items-centr"
                    >
                      <span>
                        <InformationCircleIcon className="w-5" />
                      </span>
                      {deskripsi}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            )
          }
        )}
    </div>
  )
}
