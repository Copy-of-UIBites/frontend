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

export const ProfileUser = () => {
  const { user } = useUserProfile()
  console.log(user)
  const router = useRouter()
  return (
    <div>
      {!user ? (
        <CircularProgress />
      ) : (
        <div className="flex justify-center mt-10">
          <Card className="max-w-xs w-full">
            <CardContent className="flex flex-col items-center  p-4">
              <Avatar
                alt={user.nama}
                src={user.foto}
                className="w-24 h-24 mb-4"
              />
              <Typography variant="h5" className="mb-2 font-bold">
                {user.nama}
              </Typography>
              <Typography className="mb-2">Role: {user.role}</Typography>
              <Typography variant="body2" component="p" className="mb-2">
                Nomor Telepon: {user.nomor_telepon}
              </Typography>
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
