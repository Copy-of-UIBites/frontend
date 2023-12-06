export type User = {
  email: string
}

export type UserInformation = {
  user: User
  nama: string
  nomor_telepon: string
  is_admin: boolean
  foto: string
  role: string
}

export type UserContextType = {
  user: UserInformation | null
  isLoading: boolean
  logout: () => void
}
