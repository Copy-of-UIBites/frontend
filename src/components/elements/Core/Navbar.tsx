'use client'
import React from 'react'
import { LogoutButton } from './LogoutButton'
import { useUserProfile } from '@contexts'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const { user } = useUserProfile()
  const router = useRouter()
  return (
    <div className="bg-white fixed h-16 w-full flex flex-row items-center justify-between p-4 shadow-md">
      <Typography
        variant="h4"
        className="font-bold text-blue-700 drop-shadow-md"
      >
        UIBites
      </Typography>
      {!!user ? (
        <div className="flex flex-row gap-4 items-center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              router.push('/register')
            }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              router.push('/login')
            }}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      )}
    </div>
  )
}
