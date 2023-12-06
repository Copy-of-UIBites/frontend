/* eslint-disable no-unused-vars */
'use client'
import { useUserProfile } from '@contexts'
import { CircularProgress } from '@mui/material'
import React from 'react'

export const Home = () => {
  // get the current user's profile
  const { user, isLoading } = useUserProfile()

  return (
    <div>
      {!isLoading ? (
        <div>
          <p>Welcome {user?.nama}</p>
          <p>Role {user?.role}</p>
          {/* TODO: Show homepage berdasarkan role */}
        </div>
      ) : (
        <div className="flex items-center justify-center inset-0 h-full w-full">
          <CircularProgress />
        </div>
      )}
    </div>
  )
}
