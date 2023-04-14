import '../globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session} >
      <div className="bg-slate-900 h-screen grid place-items-center text-white">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
