import React, { Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import { PublicKantinProfile } from './PublicKantinProfile'
import { useParams } from 'next/navigation'

export const KantinProfile = () => {
  const params = useParams()
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <PublicKantinProfile id={(params?.id as string) ?? ''} />
      </Suspense>
    </div>
  )
}
