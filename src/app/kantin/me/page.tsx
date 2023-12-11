'use client'
import { useUserProfile } from '@contexts'
import { OwnerKantinProfile } from '@modules'

export default function KantinOwnerDetailPage() {
  const { user } = useUserProfile()
  return !!user && <OwnerKantinProfile role={user.role} />
}
