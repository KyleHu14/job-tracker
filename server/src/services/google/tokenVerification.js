const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
	})
	console.log(ticket)
}

module.exports = { verify }
