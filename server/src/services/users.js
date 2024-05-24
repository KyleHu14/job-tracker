const supabaseClient = require("./supabase/supabase")

const throwSupabaseError = require("../utils/supabaseErrorThrower")

/**
 * Returns all users from supabase database.
 */
const getUsers = async () => {
	let { data, error } = await supabaseClient.from("user_account").select("*")

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

/**
 * Gets a single user based on the email
 *
 * @param emailAddress String - Email address associated to the user being searched.
 */
const getUser = async (emailAddress) => {
	let { data, error } = await supabaseClient
		.from("user_account")
		.select("*")
		.eq("email_address", emailAddress)

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

/**
 * Creates a user or multiple users by inserting users into the database.
 *
 * @param users Object(email_address : string, user_name : string)[] - Array of user objects.
 */
const createUsers = async (users) => {
	// Perform error checking here since supabase can only check for not null
	users.forEach((user) => {
		if (!user.email_address || !user.user_name) {
			const nullError = new Error(
				`Error : user_name or email_address cannot be null or empty.`
			)
			nullError.name = "NullError"
			throw nullError
		}
	})

	const { data, error } = await supabaseClient
		.from("user_account")
		.insert(users)
		.select()

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

/**
 * Deletes all users in the user_account table.
 */
const deleteAllUsers = async () => {
	const { error } = await supabaseClient
		.from("user_account")
		.delete()
		.neq("email_address", "")

	if (error) {
		throwSupabaseError(error)
	}
}

module.exports = {
	getUsers,
	getUser,
	createUsers,
	deleteAllUsers,
}
