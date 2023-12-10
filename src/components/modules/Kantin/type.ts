export type Menu = {
  nama: string
  deskripsi: string
  harga: number
}

export type Kantin = {
  id: number
  nama: string
  lokasi: string
  deskripsi: string
  list_foto: string[]
  status_verifikasi: string
  menu: Menu[]
}

export type Ulasan = {}
