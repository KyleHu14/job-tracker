import { Button } from "../ui/button"

import { useRouter } from "next/navigation"

interface JobActionsProps {
	jobId: string
	link: string
	idToken: string
}

export function JobActions({ jobId, link, idToken }: JobActionsProps) {
	const router = useRouter()

	const formSubmit = async () => {
		try {
			const url = `${process.env.NEXT_PUBLIC_API_URL}/jobapps/${jobId}`
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + idToken,
					"Content-Type": "application/json",
				},
			})

			router.refresh()
		} catch (e) {}
	}

	return (
		<div className="flex gap-3 justify-end">
			<a href={link}>
				<Button>Link</Button>
			</a>

			<Button>Edit</Button>
			<Button type="submit" onClick={formSubmit}>
				Delete
			</Button>
		</div>
	)
}
