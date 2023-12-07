'use client'

import { CircularProgress, Typography } from '@mui/material'
import React, { Suspense } from 'react'
import { GetKantinList } from './GetKantinList'

export const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Typography variant="h4" className="font-bold">
          Welcome to UIBites
        </Typography>
        <Typography variant="h5">Click and explore these Canteens</Typography>
        <Suspense fallback={<CircularProgress />}>
          <GetKantinList />
        </Suspense>
      </div>
    </div>
  )
}
