import NextAuth from "next-auth"
import "next-auth/jwt"

import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

import { insertUserIfExists, getUserId } from "@/supabase/users"

const config = {
	providers: [Google],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (user && user.email && user.name) {
				await insertUserIfExists(user.email, user.name)
			}

			return true
		},
		jwt({ token, account }) {
			if (account && account.id_token) {
				token.id_token = account.id_token
			}
			return token
		},
		async session({ session, token }) {
			if (token?.id_token) {
				session.id_token = token.id_token
			}

			const data = await getUserId(session.user.email)
			if (data && data[0].id) {
				session.userId = data[0].id
			}
			return session
		},
	},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
	interface Session {
		id_token?: string
		userId?: string
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id_token?: string
	}
}
