import { getServerSession } from 'next-auth/next'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { authOptions } from "./api/auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session?.user?.email)
    return { redirect: { destination: '/auth/login' } }

  const prisma = new PrismaClient()
  const stages = await prisma.stage.findMany({
    where: { owner: session.user?.email }
  })

  return { props: { session, stages } }
}

export default function Home({ session, stages }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(stages)
  if (session)
    return (
      <div>
        <h1 className="text-3xl">{session.user?.name}'s email is {session.user?.email}</h1>
        {session.user?.image ? <img src={session.user?.image} alt="" />:''}
      </div>
    )

  return <h1 className="text-6xl md:text-8xl">Dross</h1>
}
