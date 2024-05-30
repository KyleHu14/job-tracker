import { expect, test } from "vitest"

import { render, screen } from "@testing-library/react"

import { DataTable } from "@/app/dashboard/data-table"
import { jobColumns } from "@/app/dashboard/columns"

test("Data Table renders content correctly", () => {
	const tableData = [
		{
			id: "728ed52f",
			user_id: "1",
			title: "Amazon Dishwasher",
			date_applied: "04-23-2020",
			application_status: "rejected",
		},
		{
			id: "489e1d42",
			user_id: "2",
			title: "Google Food Technician",
			date_applied: "04-23-2021",
			application_status: "pending",
		},
	]

	render(<DataTable columns={jobColumns} data={tableData} />)

	const title1 = screen.getByText("Amazon Dishwasher")
	const date1 = screen.getByText("04-23-2020")

	const title2 = screen.getByText("Google Food Technician")
	const date2 = screen.getByText("04-23-2021")

	expect(title1).toBeDefined()
	expect(date1).toBeDefined()

	expect(title2).toBeDefined()
	expect(date2).toBeDefined()
})
