import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import React, { FC } from 'react'
import { Ulasan } from './type'
import { axiosInstance } from '@utils'
import { CanDeleteUlasan } from './CanDeleteUlasan'

interface UlasanDetailProps {
  ulasan: Ulasan
}

export const UlasanDetail: FC<UlasanDetailProps> = ({ ulasan }) => {
  const { id, time, review, rating, foto, user, kantin } = ulasan
  const [userName, setUserName] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/auth/profile/${user}`)
        setUserName(response.data.nama)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [user])

  return (
    <div className="p-5 border border-solid border-gray-300 rounded mb-5 font-sans text-center">
      <div className="mb-5">
        <Typography variant="body1">{review}</Typography>
      </div>

      <Typography variant="subtitle2" className="text-sm mb-5">
        - {userName} -
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              {foto.map((link, index) => (
                <TableCell key={index}>
                  <img
                    alt={`Photo ${index}`}
                    src={link}
                    className="w-20 h-20 object-cover"
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between items-end mt-5">
        <div className="text-lg">
          <Typography variant="subtitle2">
            <span className="font-bold">Rating:</span> {rating} / 5
          </Typography>
        </div>
        <div className="text-sm">
          <Typography variant="subtitle2">
            <span className="font-bold">Tanggal:</span> {time.slice(0, 10)}
          </Typography>
        </div>
        <CanDeleteUlasan
          ulasanId={id}
          canteenId={kantin as unknown as string}
        />
      </div>
    </div>
  )
}
