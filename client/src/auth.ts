import NextAuth from "next-auth"
import "next-auth/jwt"

import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

import { insertUserIfExists, getUserId } from "@/supabase/users"

const config = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			// Google requires "offline" access_type to provide a `refresh_token`
			authorization: {
				params: { access_type: "offline", prompt: "consent" },
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (user && user.email && user.name) {
				await insertUserIfExists(user.email, user.name)
			}

			return true
		},
		async jwt({ token, account }) {
			// prettier-ignore
			if (account && account.id_token && account.expires_at && account.refresh_token) {
				token.id_token = account.id_token
				token.refresh_token = account.refresh_token
				token.expires_at = account.expires_at
			} else if (Date.now() < token.expires_at * 1000) {
				// Subsequent logins, if the `access_token` is still valid, return the JWT
				return token
			} else {
				if (!token.refresh_token)
					throw new Error("Missing refresh token")

				try {
					// The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
					// at their `/.well-known/openid-configuration` endpoint.
					// i.e. https://accounts.google.com/.well-known/openid-configuration
					const response = await fetch(
						"https://oauth2.googleapis.com/token",
						{
							headers: {
								"Content-Type":
									"application/x-www-form-urlencoded",
							},
							body: new URLSearchParams({
								client_id: process.env.AUTH_GOOGLE_ID!,
								client_secret: process.env.AUTH_GOOGLE_SECRET!,
								grant_type: "refresh_token",
								refresh_token: token.refresh_token!,
							}),
							method: "POST",
						}
					)

					const responseTokens = await response.json()

					if (!response.ok) throw responseTokens

					return {
						// Keep the previous token properties
						...token,
						access_token: responseTokens.access_token,
						id_token: responseTokens.id_token,
						expires_at: Math.floor(
							Date.now() / 1000 +
								(responseTokens.expires_in as number)
						),
						// Fall back to old refresh token, but note that
						// many providers may only allow using a refresh token once.
						refresh_token:
							responseTokens.refresh_token ?? token.refresh_token,
					}
				} catch (error) {
					console.error("Error refreshing access token", error)
					// The error property can be used client-side to handle the refresh token error
					return {
						...token,
						error: "RefreshAccessTokenError" as const,
					}
				}
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
		expires_at: number
		refresh_token: string
	}
}
