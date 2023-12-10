import React, { FC } from 'react'
import { Kantin } from '../Kantin/type'
import { KantinShortDetail } from './KantinShortDetail'

interface KantinListProps {
  kantins: Kantin[]
}

export const KantinList: FC<KantinListProps> = ({ kantins }) => {
  return (
    <div>
      {kantins.map((kantin) => (
        <KantinShortDetail key={kantin.id} kantin={kantin} />
      ))}
    </div>
  )
}
