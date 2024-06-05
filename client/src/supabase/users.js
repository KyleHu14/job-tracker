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

const getUserId = async (userEmail) => {
	const { data, error } = await supabaseClient
		.from("user_account")
		.select("id")
		.eq("email_address", userEmail)

	if (error) {
		console.log(error)
	}

	return data
}

const getUserJobApplications = async (userId) => {
	const { data, error } = await supabaseClient
		.from("job_application")
		.select("id,title,company_name,date_applied,application_status")
		.eq("user_id", userId)

	if (error) {
		console.log(error)
	}

	return data
}

export { insertUserIfExists, getUserId, getUserJobApplications }
