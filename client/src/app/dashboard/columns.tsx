"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type JobApplication = {
	id: string;
	user_id: string;
	title: string;
	date_applied: Date;
	application_status: string;
};

export const jobColumns: ColumnDef<JobApplication>[] = [
	{
		accessorKey: "title",
		header: "Position Title",
	},
	{
		accessorKey: "date_applied",
		header: "Date Applied",
	},
	{
		accessorKey: "application_status",
		header: "Application Status",
	},
];
