'use client'

import { Typography } from '@mui/material'
import React from 'react'
import { GetKantinList } from './GetKantinList'

import { CanVerifyKantin } from './CanVerifyKantin'

export const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Typography variant="h4" className="font-bold">
          Welcome to UIBites
        </Typography>
        <Typography variant="h5">Click and explore these Canteens</Typography>

        <GetKantinList />

        <CanVerifyKantin/>
      </div>
    </div>
  )
}
