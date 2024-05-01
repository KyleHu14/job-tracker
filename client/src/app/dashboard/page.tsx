import { Button } from "@/components/ui/button";
import { JobApplication, jobColumns } from "./columns";
import { DataTable } from "./data-table";

import DashboardNavbar from "@/components/DashboardNavbar";

async function getData(): Promise<JobApplication[]> {
	return [
		{
			id: "728ed52f",
			user_id: "1",
			title: "Amazon Dishwasher",
			date_applied: new Date("2024-04-1"),
			application_status: "rejected",
		},
		{
			id: "489e1d42",
			user_id: "2",
			title: "Google Food Technician",
			date_applied: new Date("2024-04-10"),
			application_status: "pending",
		},
	];
}

export default async function Dashboard() {
	const tableData = await getData();

	return (
		<>
			<DashboardNavbar />
			<Button>Add a Job</Button>
			<div className="container mx-auto py-10">
				<DataTable columns={jobColumns} data={tableData} />
			</div>
		</>
	);
}
