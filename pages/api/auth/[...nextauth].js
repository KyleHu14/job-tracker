import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

// Supabase
import { createUserInfo } from "@/supabase/supabase";

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      let test = await createUserInfo(user.email)
      return true
    },
  }
}

export default NextAuth(authOptions)                                                                                  