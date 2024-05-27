const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

async function verify(token) {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
		})
	} catch (error) {
		const tokenError = new Error(error.message)
		tokenError.name = "TokenVerificationError"
		throw tokenError
	}
}

module.exports = { verify }
