const supabaseClient = require("./supabase/supabase")

const throwSupabaseError = require("../utils/supabaseErrorThrower")

const getJobapps = async () => {
	let { data, error } = await supabaseClient
		.from("job_application")
		.select("*")

	if (error) {
		throwSupabaseError(error)
	}

	return data
}
