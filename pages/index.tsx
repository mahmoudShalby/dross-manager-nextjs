import Head from 'next/head'
import { getServerSession } from 'next-auth/next'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session)
    return { redirect: { destination: '/auth/login' } }
  return { props: { session }}
}

export default function Home({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Dross manager</title>
      </Head>
      {session ? (
        <h1 className="text-6xl">Dross manager</h1>
      ):(
        <h1 className="text-6xl md:text-8xl">Dross</h1>
      )}
    </div>
  )
}
