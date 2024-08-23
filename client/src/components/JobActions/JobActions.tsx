import { Link, Trash2 } from "lucide-react"
import { EditButton } from "../ActionButtons/EditButton"
import { Button } from "../ui/button"

import { useRouter } from "next/navigation"

interface JobActionsProps {
	jobId: string
	idToken: string
	// Job Application Data
	title: string
	companyName: string
	link: string
	location: string
	salary: number
	employmentType: string
	date: string
	applicationStatus: string
}

export function JobActions({
	jobId,
	idToken,
	// Job Application Data
	title,
	companyName,
	link,
	location,
	salary,
	employmentType,
	date,
	applicationStatus,
}: JobActionsProps) {
	const router = useRouter()

	const handleDelete = async () => {
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

			<EditButton
				idToken={idToken}
				jobId={jobId}
				// Job Application Data
				curTitle={title}
				curCompanyName={companyName}
				curLocation={location}
				curSalary={salary}
				curEmploymentType={employmentType}
				curDate={date}
				curApplicationStatus={applicationStatus}
				curLink={link}
			/>

			<Button type="submit" onClick={handleDelete}>
				<Trash2 className="mr-2 h-4 w-4" />
				Delete
			</Button>
		</div>
	)
}
