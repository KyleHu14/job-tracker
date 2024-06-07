import { JobApplication, jobColumns } from "./columns"
import { DataTable } from "./data-table"

import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar"
import { DashBoardAddButton } from "@/components/DashboardModal/DashBoardAddButton"

import useGetJobApplications from "@/hooks/useFetchJobApps"
import { auth } from "@/auth"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import Link from "next/link"

export default async function Dashboard() {
	const session = await auth()

	if (!session || !session.userId)
		return (
			<>
				<div className=" w-screen h-screen flex justify-center items-center">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Login First</CardTitle>
							<CardDescription>
								You must login before tracking your job
								applications.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button>
								<Link href="/">Back to Home</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</>
		)

	const data: JobApplication[] | null = await useGetJobApplications(
		session.userId
	)

	if (data) {
		return (
			<>
				<DashboardNavbar />

				{/* <div>{JSON.stringify(session, null, 2)}</div> */}

				<div className="container pt-5 pb-10">
					<DashBoardAddButton />
				</div>

				<div className="container pt-5">
					<DataTable columns={jobColumns} data={data} />
				</div>
			</>
		)
	}
}
