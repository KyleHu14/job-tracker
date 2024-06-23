"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { PlusCircledIcon } from "@radix-ui/react-icons"
import { DatePicker } from "./DatePicker"
import { SelectStatus } from "./Select"

import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"
export function DashBoardAddButton() {
	const router = useRouter()
	const session = useSession()

	const [date, setDate] = useState<Date>()
	const [title, setTitle] = useState<string>("")
	const [companyName, setCompanyName] = useState<string>("")
	const [applicationStatus, setStatus] = useState<string>("pending")

	const formSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:3001/api/jobapps/`, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + session.data?.id_token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: session.data?.userId,
					title: title,
					date_applied: `${date?.getMonth()}-${date?.getDate()}-${date?.getFullYear()}`,
					application_status: applicationStatus,
					company_name: companyName,
				}),
			})
			router.refresh()
		} catch (e) {}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="float-right" variant="outline">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					Add a Job
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				{/* Header for Modal */}
				<DialogHeader>
					<DialogTitle>Add a Job Application</DialogTitle>
					<DialogDescription>
						Fill in the fields and click create
					</DialogDescription>
				</DialogHeader>

				{/* Input Container */}
				<div className="mt-3 grid gap-4">
					{/* 1. Title Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="name">Title</Label>
						<Input
							id="title"
							placeholder="Junior Software Engineer"
							value={title}
							onChange={(event) => {
								setTitle(event.target.value)
							}}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<Label htmlFor="name">Company Name</Label>
						<Input
							id="companyName"
							placeholder="Amazon"
							value={companyName}
							onChange={(event) => {
								setCompanyName(event.target.value)
							}}
						/>
					</div>

					{/* 2. Date Applied Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="username" className="">
							Date Applied
						</Label>
						<DatePicker date={date} setDate={setDate} />
					</div>

					{/* 3. Application Status Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="username">Application Status</Label>
						{/* Select Input for selecting the application status */}
						<SelectStatus
							applicationStatus={applicationStatus}
							setStatus={setStatus}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<DialogFooter>
					<DialogClose asChild>
						<Button type="submit" onClick={formSubmit}>
							Create
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
