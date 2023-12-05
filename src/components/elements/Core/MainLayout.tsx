import React, { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface MainLayoutProps {
  children: ReactNode
}
export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  )
}
