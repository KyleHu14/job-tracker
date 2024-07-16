"use client"

import { ColumnDef } from "@tanstack/react-table"

export type JobApplication = {
	job_title: string
	company_name: string
	location: string
	employment_type: string
	date_applied: string
	application_status: string
}

export const jobColumns: ColumnDef<JobApplication, any>[] = [
	{
		accessorKey: "job_title",
		header: "Position Title",
	},
	{
		accessorKey: "company_name",
		header: "Company",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "employment_type",
		header: "Type",
	},
	{
		accessorKey: "salary",
		header: "Salary",
	},
	{
		accessorKey: "date_applied",
		header: "Date Applied",
	},
	{
		accessorKey: "application_status",
		header: "Application Status",
	},
	// We need these two accessors since the application requires to make edits which needs the job_id
	{
		accessorKey: "link",
		header: "",
	},
	{
		accessorKey: "job_id",
		header: "",
	},
]
