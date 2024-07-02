"use client"

import { ColumnDef } from "@tanstack/react-table"

export type JobApplication = {
	id: string
	job_title: string
	company_name: string
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
		accessorKey: "link",
		header: "Link",
	},
	{
		accessorKey: "date_applied",
		header: "Date Applied",
	},
	{
		accessorKey: "application_status",
		header: "Application Status",
	},
]
