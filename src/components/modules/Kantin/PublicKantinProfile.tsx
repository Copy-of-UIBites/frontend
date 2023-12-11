import { axiosInstance } from '@utils'
import React, { FC } from 'react'
import { Kantin } from './type'
import { KantinDetail } from './KantinDetail'
import { useUserProfile } from '@contexts'

interface PublicKantinProfileProps {
  id: string
}

export const PublicKantinProfile: FC<PublicKantinProfileProps> = ({ id }) => {
  const [data, setData] = React.useState<Kantin | null>(null)
  const { user } = useUserProfile()
  const [addToFavorites, setAddToFavorites] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/kantin/${id}`)
        const kantinData = res.data as Kantin
        setData(kantinData)
        setAddToFavorites(user?.role === 'User' ? true : false)
      } catch (error) {
        console.error('Error fetching kantin data:', error)
      }
    }

    fetchData()
  }, [id, user])

  return (
    <div>
      {data && <KantinDetail kantin={data} addToFavorites={addToFavorites} />}
    </div>
  )
}
