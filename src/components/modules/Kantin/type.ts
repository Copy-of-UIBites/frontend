export type Menu = {
  nama: string
  deskripsi: string
  harga: number
}

export type Kantin = {
  id: string
  nama: string
  lokasi: string
  deskripsi: string
  list_foto: string[]
  status_verifikasi: string
  menu: Menu[]
}

export type Ulasan = {
  kantin: Kantin
  id: string
  time: string
  review: string
  rating: number
  foto: string[]
  user: number
}
