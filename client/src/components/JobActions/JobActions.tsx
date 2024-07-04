import { Button } from "../ui/button"

import Link from "next/link"

interface JobActionsProps {
	jobId: string
	link: string
}

export function JobActions({ jobId, link }: JobActionsProps) {
	const handleDelete = (deleteId: string) => {}

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
