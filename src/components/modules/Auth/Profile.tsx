import React, { FC, Suspense } from 'react'
import { UserProfile } from './UserProfile'
import { CircularProgress, Typography } from '@mui/material'

interface ProfileProps {
  role: string
}
export const Profile: FC<ProfileProps> = ({ role }) => {
  if (!role) {
    return <CircularProgress />
  }

  return (
    <div>
      {role == 'Pemilik Kantin' || role == 'User' ? (
        <Suspense fallback={<CircularProgress />}>
          <UserProfile role={role} />
        </Suspense>
      ) : (
        <Suspense fallback={<CircularProgress />}>
          <Typography variant="body1" gutterBottom>
            <span className="font-bold">
              Login terlebih dahulu untuk melihat profil
            </span>
            <br />
          </Typography>
        </Suspense>
      )}
    </div>
  )
}
