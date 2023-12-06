import React, { FC, Suspense } from 'react'
import { OwnerKantinProfile } from './OwnerKantinProfile'
import { CircularProgress } from '@mui/material'
import { PublicKantinProfile } from './PublicKantinProfile'
import { useParams } from 'next/navigation'

interface KantinProfileProps {
  role: string
}
export const KantinProfile: FC<KantinProfileProps> = ({ role }) => {
  const params = useParams()
  return (
    <div>
      {role == 'Pemilik Kantin' ? (
        <Suspense fallback={<CircularProgress />}>
          <OwnerKantinProfile />
        </Suspense>
      ) : (
        <Suspense fallback={<CircularProgress />}>
          <PublicKantinProfile id={(params?.id as string) ?? ''} />
        </Suspense>
      )}
    </div>
  )
}
