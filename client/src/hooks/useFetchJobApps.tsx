"use client"
import { useState, useEffect } from "react"

interface JobApplication {
	job_id: string
	job_title: string
	date_applied: string
	application_status: string
}

export default function useFetchJobApps(userId: string) {
	const [userJobApps, setJobApps] = useState<JobApplication[]>([])

	useEffect(() => {
		async function fetchJobApps() {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/jobapps/${userId}`
			)
			const responseData = await response.json()
			setJobApps(responseData)
		}
		if (userId) {
			fetchJobApps()
		}
	}, [])

	return userJobApps
}
