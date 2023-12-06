'use client'
import { useUserProfile } from '@contexts'
import { KantinProfile } from 'src/components/modules/Kantin'

export default function KantinDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { user } = useUserProfile()
  return <KantinProfile role={user?.role ?? ''} />
}
