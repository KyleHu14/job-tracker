// [ Importing ]
// 1. Config
const config = require("../../utils/config")

// 2. Logger
const logger = require("../../utils/logger")

// 3. Supabase
const { createClient } = require("@supabase/supabase-js")

// [ Initializing ]
// 1. Init supabase Client
logger.info(`[Supabase] : Initializing client...`)

let supabaseClient
try {
	supabaseClient = createClient(
		config.SUPABASE_URL,
		config.SUPABASE_PUBLIC_KEY
	)
} catch (error) {
	logger.error(
		`[Supabase] : Error occured with connecting to Supabase`,
		error.message
	)
}

logger.info(`[Supabase] : Successfully created client`)

module.exports = supabaseClient
