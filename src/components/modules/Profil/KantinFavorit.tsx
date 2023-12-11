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
          <Typography variant="h4">Daftar Kantin Favorit ⭐️</Typography>
          {kantins.length > 0 ? (
            <KantinList kantins={kantins} />
          ) : (
            <div>
              <Typography variant="h6">
                Kamu belum ada kantin favorit.
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
