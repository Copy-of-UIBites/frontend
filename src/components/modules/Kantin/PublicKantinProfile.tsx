import { axiosInstance } from '@utils'
import React, { FC } from 'react'
import { Kantin } from './type'
import { KantinDetail } from './KantinDetail'

interface PublicKantinProfileProps {
  id: string
}
export const PublicKantinProfile: FC<PublicKantinProfileProps> = async ({
  id,
}) => {
  const res = await axiosInstance.get(`/kantin/${id}`)
  const data = res.data as Kantin

  return (
    <div>
      <KantinDetail kantin={data} addToFavorites={true} />
    </div>
  )
}
