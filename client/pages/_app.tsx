// Global CSS
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// Layout
// import Layout from '@/components/Layout'

// SessionProvider from next-auth
import { SessionProvider } from "next-auth/react"

// Import fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  // Create a new supabase browser client on every first render.

  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
