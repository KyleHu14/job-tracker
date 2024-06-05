const useGetJobApplications = async (userId: string) => {
	const response = await fetch(
		`http://localhost:3001/api/jobapps/${userId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// Add any other headers if needed
			},
		}
	)

	if (!response.ok) {
		throw new Error("Error occured in fetching data.")
	}

	const data = await response.json()

	return data
}

export default useGetJobApplications
