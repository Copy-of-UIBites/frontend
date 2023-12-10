import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import React, { FC } from 'react'
import { Kantin } from './type'
interface KantinDetailProps {
  kantin: Kantin
}
export const KantinDetail: FC<KantinDetailProps> = ({ kantin }) => {
  const { nama, deskripsi, lokasi, menu } = kantin
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
            {menu.map((row) => (
              <TableRow
                key={row.nama}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.deskripsi}
                </TableCell>
                <TableCell align="right">{row.harga}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
