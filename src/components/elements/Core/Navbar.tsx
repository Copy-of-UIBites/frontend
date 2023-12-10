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
    <div className="bg-rose-50 fixed w-full flex flex-row items-center justify-between px-10 py-4 shadow-md">
      <Typography
        variant="h4"
        className="font-bold text-blue-700 drop-shadow-md"
      >
        <span className="text-yellow-400">UI</span>
        Bites 🤤
      </Typography>
      {!user ? (
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
