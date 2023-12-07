import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from 'src/components/elements/Core'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UIBites',
  description: 'Canteen Review App for UI tenants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
