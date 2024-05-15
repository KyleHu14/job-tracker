const { createClient } = require("@supabase/supabase-js")

const { SUPABASE_URL, SUPABASE_PUBLIC_KEY } = require("../config")

// 2. Both URLS are not null, we can create and export the supabase client
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)

/**
 * Returns all users from supabase database.
 */
const getUsers = async () => {
	let { data, error } = await supabaseClient.from("user_account").select("*")

	if (error) {
		throw new Error(
			`[Supabase Error] Error Code : ${error.code}, Error Message : ${error.message}.`
		)
	}

	return data
}

/**
 * Creates a user with the emailAdress & userName parameter and returns the newly created user record.
 *
 * @param emailAddress String - Email address associated with the user being created.
 * @param userName String - Username associated with the user being created.
 */
const createUser = async (emailAddress, userName) => {
	const newUser = {
		email_address: emailAddress,
		user_name: userName,
	}

	const { data, error } = await supabaseClient
		.from("user_account")
		.insert(newUser)
		.select()

	if (error) {
		throw new Error(
			`[Supabase Error] Error Code : ${error.code}, Error Message : ${error.message}.`
		)
	}

	return data[0]
}
module.exports = {
	getUsers,
}
