import { Link, Trash2 } from "lucide-react"
import { EditButton } from "../ActionButtons/EditButton"
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
				<Button>
					<Link className="mr-2 h-4 w-4" />
					Link
				</Button>
			</a>

			<EditButton />

			<Button type="submit" onClick={formSubmit}>
				<Trash2 className="mr-2 h-4 w-4" />
				Delete
			</Button>
		</div>
	)
}
