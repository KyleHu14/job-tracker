import { Button } from "../ui/button"

import { redirect } from "next/navigation"

interface JobActionsProps {
	jobId: string
	link: string
	idToken: string
}

export function JobActions({ jobId, link, idToken }: JobActionsProps) {
	const handleDelete = async (deleteId: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/jobapps/${jobId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + idToken,
						"Content-Type": "application/json",
					},
				}
			)
			redirect("/dashboard")
		} catch (e) {}
	}

	return (
		<div className="flex gap-3 justify-end">
			<a href={link}>
				<Button>Link</Button>
			</a>

			<Button>Edit</Button>
			<Button onClick={() => handleDelete(jobId)}>Delete</Button>
		</div>
	)
}
