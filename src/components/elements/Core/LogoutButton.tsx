'use client'
import { useUserProfile } from '@contexts'
import { Button } from '@mui/material'
import React from 'react'

export const LogoutButton = () => {
  const { logout } = useUserProfile()
  return (
    <Button variant="outlined" color="error" onClick={logout}>
      Logout
    </Button>
  )
}
