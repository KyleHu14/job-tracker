const supabaseClient = require("./supabase")

const throwSupabaseError = require("../../utils/supabaseErrorThrower")

const getJobApps = async () => {
	const { data, error } = await supabaseClient.rpc("get_job_applications", {})

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

const createJobApps = async (jobApps) => {
	const { data, error } = await supabaseClient
		.from("job_application")
		.insert(jobApps)
		.select()

	if (error) {
		console.log(error)
		throwSupabaseError(error)
	}

	return data
}

const deleteAllJobApps = async () => {
	const { error } = await supabaseClient
		.from("job_application")
		.delete()
		.neq("title", "")

	if (error) {
		throwSupabaseError(error)
	}
}

const getUserJobApps = async (userId) => {
	const { data, error } = await supabaseClient.rpc(
		"get_user_job_applications",
		{ input_user_id: userId }
	)

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

const deleteJobApp = async (jobId) => {
	const { data, error } = await supabaseClient.rpc("delete_job_app", {
		job_id: jobId,
	})

	if (error) {
		throwSupabaseError(error)
	}

	return data
}

const editJobApp = async (jobId, updateData) => {
	const { data, error } = await supabaseClient
		.from("job_application")
		.update(updateData)
		.eq("id", jobId)
		.select()

	if (error) {
		console.log(error)
		throwSupabaseError(error)
	}

	return data
}

module.exports = {
	getJobApps,
	deleteAllJobApps,
	createJobApps,
	getUserJobApps,
	deleteJobApp,
	editJobApp,
}
