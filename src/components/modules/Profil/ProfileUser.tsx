'use client'
import { useUserProfile } from '@contexts'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { KantinFavorit } from './KantinFavorit'

export const ProfileUser = () => {
  const { user } = useUserProfile()

  const router = useRouter()
  return (
    <div>
      {!user ? (
        <div className="flex mt-10 items-center flex-col gap-10">
          <Typography variant="h4" className="mb-2 font-bold">
            Profil Page
          </Typography>
          <CircularProgress />
          <Typography component="p" className="mb-2">
            Mohon tunggu sebentar...
          </Typography>
        </div>
      ) : (
        <div className="flex mt-10 items-center flex-col gap-5">
          <Typography variant="h4" className="mb-2 font-bold">
            Profil Page
          </Typography>
          <div className="flex flex-row w-full mt-10 mb-10 justify-center gap-20">
            <Card className="max-w-xs sticky top-0 h-full">
              <CardContent className="flex flex-col items-center  p-4">
                <Avatar alt={user.nama} src={user.foto} className="w-40 h-40" />
              </CardContent>
            </Card>
            <div className="flex justify-center flex-col gap-1">
              <Typography variant="h6">Nama: {user.nama}</Typography>
              <Typography variant="h6">Role: {user.role}</Typography>
              <Typography variant="h6" component="p">
                Nomor Telepon: {user.nomor_telepon}
              </Typography>
              <div className="flex flex-row w-full mt-2 gap-2">
                <Button
                  variant="outlined"
                  onClick={() => {
                    router.push('/edit')
                  }}
                >
                  Edit Profil
                </Button>
                {user.is_admin && (
                  <span className="px-2 py-1 bg-blue-500 text-red-600 text-sm rounded">
                    Admin
                  </span>
                )}
                {user.role == 'Pemilik Kantin' && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      router.push('/kantin/me')
                    }}
                  >
                    My Kantin
                  </Button>
                )}
              </div>
            </div>
          </div>

          <KantinFavorit role={user?.role} />
        </div>
      )}
    </div>
  )
}
