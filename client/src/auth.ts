import NextAuth from "next-auth"
import "next-auth/jwt"

import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

const config = {
	providers: [Google],
	callbacks: {
		jwt({ token, account }) {
			if (account && account.id_token) {
				token.id_token = account.id_token
			}
			return token
		},
		session({ session, token }) {
			if (token?.id_token) {
				session.id_token = token.id_token
			}
			return session
		},
	},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
	interface Session {
		id_token?: string
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id_token?: string
	}
}
