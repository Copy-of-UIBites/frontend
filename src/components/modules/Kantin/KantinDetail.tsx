'use client'
import React, { FC } from 'react'
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Modal,
  Box,
} from '@mui/material'
import { Kantin } from './type'
import { axiosInstance } from '@utils'
import { UlasanDetail } from './UlasanDetail'
import { AddUlasanForm } from './AddUlasanForm'

interface KantinDetailProps {
  kantin: Kantin
  addToFavorites: boolean
}

export const KantinDetail: FC<KantinDetailProps> = ({
  kantin,
  addToFavorites,
}) => {
  const { nama, deskripsi, lokasi, menu, status_verifikasi } = kantin
  const [ulasanList, setUlasanList] = React.useState([])
  const [isInFavorites, setIsInFavorites] = React.useState(false)

  const [isOpenReviewForm, setIsOpenReviewForm] = React.useState(false)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem('token')
        console.log(token)
        const [ulasanResponse, favoritesResponse] = await Promise.all([
          axiosInstance.get(`/kantin/ulasan/${kantin.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          addToFavorites
            ? axiosInstance.get('/kantin/daftar-kantin-favorit/', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            : Promise.resolve(null),
        ])

        const ulasanData = ulasanResponse.data
        setUlasanList(ulasanData)

        if (addToFavorites && favoritesResponse) {
          const favorites = favoritesResponse.data
          const isInFavorites = favorites.some(
            (favorite: { id: string }) => favorite.id == kantin.id
          )
          setIsInFavorites(isInFavorites)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [kantin.id, addToFavorites])

  const handleAddToFavorites = async () => {
    try {
      await axiosInstance.post('/kantin/daftar-kantin-favorit/add/', {
        kantin_id: kantin.id,
      })
      setIsInFavorites(true)
    } catch (error) {
      console.error('Error adding to favorites', error)
    }
  }

  const handleRemoveFromFavorites = async () => {
    try {
      await axiosInstance.post('/kantin/daftar-kantin-favorit/remove/', {
        kantin_id: kantin.id,
      })
      setIsInFavorites(false)
    } catch (error) {
      console.error('Error removing from favorites', error)
    }
  }

  if (addToFavorites && isInFavorites === null) {
    return <CircularProgress />
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {nama}
      </Typography>

      <Typography variant="h6" gutterBottom>
        <span className="font-bold">Lokasi:</span> <br />
        {lokasi}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <span className="font-bold">Deskripsi:</span>
        <br />
        {deskripsi}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <span className="font-bold">Status:</span>
        <br />
        {status_verifikasi}
      </Typography>

      {addToFavorites && (
        <Button
          variant="outlined"
          onClick={
            isInFavorites ? handleRemoveFromFavorites : handleAddToFavorites
          }
          className="mb-4"
        >
          {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      )}

      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="right">Deskripsi</TableCell>
              <TableCell align="right">Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu &&
              menu.map((row) => (
                <TableRow
                  key={row.nama}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nama}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.deskripsi}
                  </TableCell>
                  <TableCell align="right">{row.harga}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        onClick={() => {
          setIsOpenReviewForm(true)
        }}
        className="mb-4 mt-4"
      >
        Add Review
      </Button>

      <Modal
        open={isOpenReviewForm}
        onClose={() => {
          setIsOpenReviewForm(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 20,
            p: 4,
            borderRadius: 10,
          }}
        >
          <AddUlasanForm kantin={kantin} />
          <center>
            <Button
              variant="outlined"
              color="error"
              className="mb-4"
              onClick={() => {
                setIsOpenReviewForm(false)
              }}
            >
              Cancel
            </Button>
          </center>
        </Box>
      </Modal>

      <div className="flex flex-col gap-2">
        <Typography variant="h5">Reviews</Typography>

        {ulasanList.length == 0 ? (
          <Typography variant="body1" className="text-black/50">
            No reviews yet
          </Typography>
        ) : (
          ulasanList.map((ulasan, index) => (
            <UlasanDetail key={index} ulasan={ulasan} />
          ))
        )}
      </div>
    </div>
  )
}
