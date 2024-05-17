const throwSupabaseError = (error) => {
	const serverError = new Error(
		`Error Code : ${error.code}, Error Message : ${error.message}`
	)
	serverError.name = "ServerError"
	throw serverError
}

module.exports = throwSupabaseError
