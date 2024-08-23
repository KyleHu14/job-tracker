"use client"

import { useEffect, useState } from "react"

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

import { DatePicker } from "../FormInputs/DatePicker"
import { FormSelector } from "../FormInputs/FormSelector"

import { getAllJobApplications } from "@/data-access/jobApplications"

import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

interface Props {
	idToken: string
	jobId: string
	curTitle: string
	curCompanyName: string
	curLink: string
	curLocation: string
	curSalary: number
	curEmploymentType: string
	curDate: string
	curApplicationStatus: string
}

export function EditButton({
	idToken,
	jobId,
	curTitle,
	curCompanyName,
	curLink,
	curLocation,
	curSalary,
	curEmploymentType,
	curDate,
	curApplicationStatus,
}: Props) {
	const router = useRouter()
	// const session = useSession()

	const EmploymentTypeOptions = [
		{ storedValue: "full_time", displayValue: "Full Time" },
		{ storedValue: "part_time", displayValue: "Part Time" },
		{ storedValue: "internship", displayValue: "Internship" },
		{ storedValue: "contract", displayValue: "Contract" },
		{ storedValue: "freelance", displayValue: "Freelance" },
		{ storedValue: "other", displayValue: "Other" },
	]
	const ApplicationStatusOptions = [
		{ displayValue: "Accepted", storedValue: "accepted" },
		{ displayValue: "Pending", storedValue: "pending" },
		{ displayValue: "Rejected", storedValue: "rejected" },
		{ displayValue: "Interviewing", storedValue: "interviewing" },
		{ displayValue: "Offer", storedValue: "offer" },
	]

	// Form Values
	const [title, setTitle] = useState<string>(curTitle)
	const [companyName, setCompanyName] = useState<string>(curCompanyName)
	const [jobLink, setJobLink] = useState<string>(curLink)
	const [location, setLocation] = useState<string>(curLocation)
	const [salary, setSalary] = useState<number>(curSalary)
	const [employmentType, setEmploymentType] =
		useState<string>(curEmploymentType)
	const [date, setDate] = useState<Date | undefined>(
		new Date(curDate + "T00:00:00")
	)
	const [applicationStatus, setStatus] =
		useState<string>(curApplicationStatus)

	const formSubmit = async () => {
		// Build the edit body first
		const editBody = {
			title: title,
			company_name: companyName,
			link: jobLink,
			location: location,
			salary: salary,
			employment_type: employmentType,
			date_applied: date
				? `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
				: null,
		}

		// prettier-ignore
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/jobapps/${jobId}`,
				{
					method: "PUT",
					headers: {
						Authorization: "Bearer " + idToken,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(editBody),
				}
			)
			router.refresh()
		} catch (e) {}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="float-right">
					<Pencil className="mr-2 h-4 w-4" />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				{/* Header for Modal */}
				<DialogHeader>
					<DialogTitle>Edit Job Application</DialogTitle>
					<DialogDescription>
						Edit the fields and click confirm
					</DialogDescription>
				</DialogHeader>

				{/* Input Container */}
				<div className="mt-3 grid gap-4">
					{/* Title Input */}
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

					{/* Company Name Input */}
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

					{/* Job Posting Link Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="name">Link</Label>
						<Input
							id="link"
							placeholder="https://joblink.com"
							value={jobLink}
							onChange={(event) => {
								setJobLink(event.target.value)
							}}
						/>
					</div>

					{/* Location Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="name">Location</Label>
						<Input
							id="location"
							placeholder="Seattle, WA"
							value={location}
							onChange={(event) => {
								setLocation(event.target.value)
							}}
						/>
					</div>

					{/* Salary Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="name">Salary</Label>
						<Input
							id="salary"
							placeholder="60,000$"
							value={salary}
							type="number"
							onChange={(event) => {
								setSalary(parseInt(event.target.value))
							}}
						/>
					</div>

					{/* Job Type Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="username">Employment Type</Label>
						{/* Select Input for selecting the application status */}
						<FormSelector
							selectedValue={employmentType}
							setSelectedValue={setEmploymentType}
							options={EmploymentTypeOptions}
							placeholderValue="Full Time"
							title="Employment Types"
						/>
					</div>

					{/* Date Applied Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="username" className="">
							Date Applied
						</Label>
						<DatePicker date={date} setDate={setDate} />
					</div>

					{/* Application Status Input */}
					<div className="flex flex-col gap-4">
						<Label htmlFor="username">Application Status</Label>
						{/* Select Input for selecting the application status */}
						<FormSelector
							selectedValue={applicationStatus}
							setSelectedValue={setStatus}
							options={ApplicationStatusOptions}
							placeholderValue="Pending"
							title="Statuses"
						/>
					</div>
				</div>

				{/* Submit Button */}
				<DialogFooter>
					<DialogClose asChild>
						<Button type="submit" onClick={formSubmit}>
							Confirm
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
