'use client'

import { KantinProfile } from 'src/components/modules/Kantin'

export default function KantinDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <KantinProfile />
}
