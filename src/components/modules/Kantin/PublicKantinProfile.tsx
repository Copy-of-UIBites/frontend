import { axiosInstance } from '@utils'
import React, { FC } from 'react'
import { Kantin } from './type'
import { KantinDetail } from './KantinDetail'
import { redirect } from 'next/navigation'

interface PublicKantinProfileProps {
  id: string
}
export const PublicKantinProfile: FC<PublicKantinProfileProps> = async ({
  id,
}) => {
  let data
  try {
    const res = await axiosInstance.get(`/kantin/${id}`)
    data = res.data as Kantin
  } catch (error) {
    redirect('/')
  }

  return (
    <div>
      <KantinDetail kantin={data} addToFavorites={true} />
    </div>
  )
}
