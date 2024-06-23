import { JobApplication } from "@/app/dashboard/columns"

// Fetch Function Interface
interface GetJobApplicationsReturnTypes {
	data: JobApplication[] | null
	error: string | null
}

// Fetch Function
export const getJobApplications = async (
	userId: string
): Promise<GetJobApplicationsReturnTypes> => {
	let data = null
	let error = null

	try {
		const response = await fetch(
			`http://localhost:3001/api/jobapps/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		data = await response.json()
	} catch (e) {
		if (e instanceof Error) {
			error = e.message
			return { data, error }
		}
	}
	return { data, error }
}
