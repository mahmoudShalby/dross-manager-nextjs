import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
