"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type JobApplication = {
	id: string
	title: string
	company_name: string
	date_applied: string
	application_status: string
}

export const jobColumns: ColumnDef<JobApplication, any>[] = [
	{
		accessorKey: "title",
		header: "Position Title",
	},
	{
		accessorKey: "company_name",
		header: "Company",
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
