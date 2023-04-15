import { getServerSession } from 'next-auth/next'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { authOptions } from "./api/auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const email = session?.user?.email
  if (!email)
    return { redirect: { destination: '/auth/login' } }

  const stages = await prisma.stage.findMany({
    where: { owner: email }
  })

  return { props: { email, stages } }
}

export default function Home({ email, stages }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1 className="text-3xl">{email}</h1>
    </div>
  )
}
