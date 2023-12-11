'use client'
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from 'react'
import { axiosInstance } from '../utils/AxiosInstance'
import toast from 'react-hot-toast'
import { UserContextType, UserInformation } from './type'
import { usePathname, useRouter } from 'next/navigation'
import { AUTH_URL } from './constants'
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
})
interface UserProviderProps {
  children: ReactNode
}
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const [user, setUser] = useState<UserInformation | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!user && !AUTH_URL.includes(pathname) && !!token) {
      const storedUserData = localStorage.getItem('user')
      if (storedUserData) {
        setUser(JSON.parse(storedUserData))
        setIsLoading(false)
      } else {
        // Function to fetch user profile
        setIsLoading(true)
        const fetchUserProfile = async () => {
          try {
            const response = await axiosInstance.get('/auth/profile', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
            setIsLoading(false)
          } catch (error: any) {
            toast.error('Error fetching user data ', error?.data?.detail)
            setIsLoading(false)
          }
        }

        fetchUserProfile()
      }
    }
  }, [pathname])

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
      window.location.href = '/login'
    }
  }
  const router = useRouter()
  const assertAlive = (decoded: any) => {
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      localStorage.removeItem('token')
      setUser(null)
      router.push('/login')
      throw new Error(
        `Your session has expired. Please log in again to continue`
      )
    }
  }
  useEffect(() => {
    try {
      const token = localStorage.getItem('token') as string
      if (!token || token === 'undefined') {
        throw new Error()
      }
      assertAlive(jwtDecode(token))
    } catch (err: any) {
      if (err.message) toast.error(err.message)
    }
  }, [pathname])

  return (
    <UserContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export const useUserProfile = () => {
  return useContext(UserContext)
}
