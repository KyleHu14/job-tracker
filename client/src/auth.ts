import NextAuth from "next-auth";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [google],

	// We use a callback here to create a record for the user in supabase
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("Success signin");
			return true;
		},
	},
});
