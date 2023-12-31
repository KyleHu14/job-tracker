import s from '@/styles/components/LoginBtn.module.css'
import { signIn, signOut } from "next-auth/react"

export default function LoginBtn({session} : any) {

  // Function that double checks if the user is registered in the DB or not

  if (session && session.user) {
    return (
      <div style={{display: "flex", alignItems: "center", columnGap: "1rem" }}>
        <div>Signed in as {session.user.email}</div>
        <button className={s.signupBtn} onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      <button className={s.signupBtn} onClick={() => signIn()}>Sign in</button>
    </>
  )
}