import supabaseClient from "./supabase"

const insertUserIfExists = async (userEmail, userName) => {
	const { data, error } = await supabaseClient.rpc("insert_user_if_exists", {
		input_email: userEmail,
		input_user_name: userName,
	})

	if (error) {
		console.log(error)
	}

	return data
}

export default insertUserIfExists
