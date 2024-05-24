const supabaseClient = require("./supabase/supabase")

const throwSupabaseError = require("../utils/supabaseErrorThrower")

const getJobApps = async () => {
	const { data, error } = await supabaseClient.rpc("get_job_applications")

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

module.exports = { getJobApps, deleteAllJobApps, createJobApps }
