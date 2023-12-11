import { axiosInstance } from '@utils'
import React, { FC, useEffect, useState } from 'react'
import { Kantin } from '../Kantin/type'
import { KantinList } from '../Kantin/KantinList'
import { Typography } from '@mui/material'

interface KantinFavoritProps {
  role: string
}

export const KantinFavorit: FC<KantinFavoritProps> = ({ role }) => {
  const [kantins, setKantins] = useState<Kantin[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role == 'User') {
          const response = await axiosInstance.get(
            `/kantin/daftar-kantin-favorit`
          )
          setKantins(response.data)
        }
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
          <Typography variant="h4">Daftar Kantin Favorit ⭐️</Typography>
          <KantinList kantins={kantins} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
