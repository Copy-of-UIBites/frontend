import { axiosInstance } from '@utils'
import React, { FC, useEffect, useState } from 'react'
import { Kantin } from '../Kantin/type'
import { KantinList } from '../Kantin/KantinList'

interface UserProfileProps {
  role: string
}

export const UserProfile: FC<UserProfileProps> = ({ role }) => {
  const [kantins, setKantins] = useState<Kantin[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/kantin/daftar-kantin-favorit`
        )
        setKantins(response.data)
      } catch (error) {
        console.error('Error fetching user favorites:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {role == 'User' ? (
        <div>
          <h2>Daftar Kantin Favorit</h2>
          <KantinList kantins={kantins} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
