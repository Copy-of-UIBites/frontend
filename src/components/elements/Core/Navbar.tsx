'use client'
import React from 'react'
import { LogoutButton } from './LogoutButton'
import { useUserProfile } from '@contexts'
import { Typography } from '@mui/material'

export const Navbar = () => {
  const { user } = useUserProfile()
  return (
    <div className="bg-white fixed h-16 w-full flex flex-row items-center justify-between p-4 shadow-md">
      <Typography
        variant="h4"
        className="font-bold text-blue-700 drop-shadow-md"
      >
        UIBites
      </Typography>
      {!!user && (
        <div className="flex justify-end">
          <LogoutButton />
        </div>
      )}
    </div>
  )
}
