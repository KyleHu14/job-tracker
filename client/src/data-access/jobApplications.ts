import { JobApplication } from "@/app/dashboard/columns"

// Fetch Function Interface
interface GetJobApplicationsReturnTypes {
	data: JobApplication[] | null
	error: string | null
}

// Fetch Function
export const getAllJobApplications = async (
	userId: string
): Promise<GetJobApplicationsReturnTypes> => {
	let data = null
	let error = null

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/jobapps/${userId}`,
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
