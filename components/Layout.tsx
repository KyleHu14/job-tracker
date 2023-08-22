import { ReactNode } from 'react'
import Navbar from './Navbar'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
 
export default function Layout({ children } : {children : ReactNode}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}