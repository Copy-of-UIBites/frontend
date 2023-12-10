'use client'
import React from 'react'
import { LogoutButton } from './LogoutButton'
import { useUserProfile } from '@contexts'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/solid'

export const Navbar = () => {
  const { user } = useUserProfile()
  const router = useRouter()
  return (
    <div className="bg-rose-50 fixed w-full flex flex-row items-center justify-between px-10 py-4 shadow-md">
      <Link href={'/'}>
        <Typography
          variant="h4"
          className="font-bold text-blue-700 drop-shadow-md"
        >
          <span className="text-yellow-400">UI</span>
          Bites 🤤
        </Typography>
      </Link>
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
        <div className="flex items-center flex-row gap-4 justify-end">
          <button
            onClick={() => {
              router.push('/profile')
            }}
            className="flex flex-row gap-2 text-blue-800"
          >
            <UserIcon className="w-6" />
            <span>Profile</span>
          </button>
          <LogoutButton />
        </div>
      )}
    </div>
  )
}
