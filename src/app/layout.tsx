import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiDefensaPerú — Admin',
  description: 'Panel de administración MiDefensaPerú',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex bg-gray-50 antialiased">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </body>
    </html>
  )
}
