import { expect, test } from "vitest"

import { render, screen } from "@testing-library/react"

import { DataTable } from "@/app/dashboard/data-table"
import { jobColumns, JobApplication } from "@/app/dashboard/columns"

test("Data Table renders content correctly", () => {
	const tableData: JobApplication[] = [
		{
			id: "728ed52f",
			job_title: "Dishwasher",
			company_name: "Google",
			date_applied: "04-23-2020",
			application_status: "rejected",
		},
		{
			id: "489e1d42",
			job_title: "Food Technician",
			company_name: "Scale AI",
			date_applied: "04-23-2021",
			application_status: "pending",
		},
	]

	render(<DataTable columns={jobColumns} data={tableData} />)

	const title1 = screen.getByText("Dishwasher")
	const date1 = screen.getByText("04-23-2020")

	const title2 = screen.getByText("Food Technician")
	const date2 = screen.getByText("04-23-2021")

	expect(title1).toBeDefined()
	expect(date1).toBeDefined()

	expect(title2).toBeDefined()
	expect(date2).toBeDefined()
})
