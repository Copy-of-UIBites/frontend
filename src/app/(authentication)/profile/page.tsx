'use client'
import { useUserProfile } from '@contexts'
import { Profile } from 'src/components/modules/Auth/Profile'

export default function ProfilePage() {
  const { user } = useUserProfile()
  return (
    <div>
      <Profile role={user?.role ?? ''} />
    </div>
  )
}
