import '../globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="bg-slate-900 h-screen grid place-items-center text-white">
        <Head>
          <title>Dross</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
