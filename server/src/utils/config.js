// This is where all .env files are handled
require("dotenv").config()

// Port of API
const PORT = process.env.PORT

// Supabase Values
const SUPABASE_URL =
	process.env.NODE_ENV === "test"
		? process.env.TEST_SUPABASE_URL
		: process.env.SUPABASE_URL

const SUPABASE_PUBLIC_KEY =
	process.env.NODE_ENV === "test"
		? process.env.TEST_SUPABASE_PUBLIC_KEY
		: process.env.SUPABASE_PUBLIC_KEY

module.exports = {
	PORT,
	SUPABASE_URL,
	SUPABASE_PUBLIC_KEY,
}
