import { axiosInstance } from '@utils'
import React, { useEffect, useState } from 'react'
import { Kantin } from '../Kantin/type'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import {
  BuildingStorefrontIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { AxiosResponse } from 'axios'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export const GetKantinList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [kantinList, setKantinList] = useState<Kantin[]>([])
  useEffect(() => {
    axiosInstance.get(`/kantin/list?q=`).then((res: AxiosResponse) => {
      if (res.status == 200) {
        setKantinList(res.data)
      }
    })
  }, [])

  const handleSearch = () => {
    axiosInstance
      .get(`/kantin/list?q=${searchQuery}`)
      .then((res: AxiosResponse) => {
        if (res.status == 200) {
          setKantinList(res.data)
        }
      })
  }

  return (
    <div>
      <div className="my-4 flex flex-row gap-3">
        <MagnifyingGlassIcon className="w-6" />
        <TextField
          id="outlined-basic"
          label="Search Kantin"
          name="search"
          variant="outlined"
          className="w-full"
          value={searchQuery}
          onChange={(e: any) => {
            setSearchQuery(e.target.value)
          }}
        />
        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {kantinList.length == 0 ? (
        <div className="flex w-full justify-center py-3">
          <Typography variant="h5">
            Your search did not match any kantin.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-start gap-6 px-4">
          {kantinList
            ?.filter((item) => item.status_verifikasi == 'Terverifikasi')
            .map(
              (
                { id, nama, lokasi, deskripsi, list_foto, status_verifikasi },
                idx
              ) => {
                return (
                  <Link href={`/kantin/${id}`} key={id}>
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
      )}
    </div>
  )
}
