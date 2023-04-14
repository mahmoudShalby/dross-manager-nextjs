import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout'
  },
}

export default NextAuth(authOptions)
