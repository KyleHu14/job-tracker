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
import { DatePicker } from "../FormInputs/DatePicker"
import { FormSelector } from "../FormInputs/FormSelector"

import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"

export function AddButton() {
	const router = useRouter()
	const session = useSession()

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
	const [date, setDate] = useState<Date>()
	const [title, setTitle] = useState<string>("")
	const [companyName, setCompanyName] = useState<string>("")
	const [jobLink, setJobLink] = useState<string>("")
	const [applicationStatus, setStatus] = useState<string>("pending")
	const [employmentType, setEmploymentType] = useState<string>("full_time")
	const [location, setLocation] = useState<string>("")
	const [salary, setSalary] = useState<number>(0)

	const clearForm = () => {
		setDate(undefined)
		setTitle("")
		setCompanyName("")
		setJobLink("")
		setStatus("pending")
		setEmploymentType("full_time")
		setLocation("")
		setSalary(0)
	}

	const formSubmit = async () => {
		const { data } = session

		// prettier-ignore
		const dateString = date ? `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`  : null

		// Field
		const allFieldsExist =
			data &&
			data.id_token &&
			data.userId &&
			title &&
			dateString &&
			applicationStatus &&
			companyName

		if (allFieldsExist) {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/jobapps/`,
					{
						method: "POST",
						headers: {
							Authorization: "Bearer " + session.data?.id_token,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user_id: session.data?.userId,
							title: title,
							company_name: companyName,
							date_applied: dateString,
							application_status: applicationStatus,
							link: jobLink,
							location: location,
							salary: salary,
							employment_type: employmentType,
						}),
					}
				)
				clearForm()
				router.refresh()
			} catch (e) {}
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="float-right" variant="outline">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					Add a Job
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-full">
				{/* Header for Modal */}
				<DialogHeader>
					<DialogTitle>Add a Job Application</DialogTitle>
					<DialogDescription>
						Fill in the fields and click create
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
							Create
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
