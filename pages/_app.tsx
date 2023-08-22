// Global CSS
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// Layout
import Layout from '@/components/Layout'

// SessionProvider from next-auth
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  // Create a new supabase browser client on every first render.

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
