import { jobColumns } from "./columns"
import { DataTable } from "./data-table"

import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar"
import { AddButton } from "@/components/ActionButtons/AddButton"

import { auth } from "@/auth"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { getAllJobApplications } from "@/data-access/jobApplications"

import { SessionProvider } from "next-auth/react"

import Link from "next/link"

// Page
export default async function Dashboard() {
	const session = await auth()

	if (!session)
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

	if (!session.userId)
		return (
			<>
				<div className=" w-screen h-screen flex justify-center items-center">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Database Error</CardTitle>
							<CardDescription>
								There was a problem with fetching your user id.
								Notify the development team ASAP.
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

	const { data, error } = await getAllJobApplications(session.userId)

	// return <div>Hello World</div>

	if (error) {
		return (
			<>
				<DashboardNavbar />
				<div className="px-10">
					<h1>An error occured with fetching your data.</h1>
					<p>Error Message : {error}</p>
				</div>
			</>
		)
	}

	if (data && session.id_token) {
		return (
			<>
				<DashboardNavbar />

				{/* <div>{JSON.stringify(session, null, 2)}</div> */}

				<div className="container pt-5 pb-10">
					<SessionProvider>
						<AddButton />
					</SessionProvider>
				</div>

				<div className="container pt-5">
					<DataTable
						columns={jobColumns}
						data={data}
						idToken={session.id_token}
					/>
				</div>
			</>
		)
	}
}
