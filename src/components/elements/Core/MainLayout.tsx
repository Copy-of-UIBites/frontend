import { UserProvider } from '@contexts'
import React, { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './Navbar'

interface MainLayoutProps {
  children: ReactNode
}
export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Toaster />
      <UserProvider>
        <>
          <Navbar />
          <div className="pt-20 px-4">{children}</div>
        </>
      </UserProvider>
    </div>
  )
}
