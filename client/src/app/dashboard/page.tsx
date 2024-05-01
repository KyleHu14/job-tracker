import { Button } from "@/components/ui/button";
import { JobApplication, jobColumns } from "./columns";
import { DataTable } from "./data-table";

import DashboardNavbar from "@/components/DashboardNavbar";
import { DashBoardAddButton } from "@/components/DashboardModal/DashBoardAddButton";

async function getData(): Promise<JobApplication[]> {
	return [
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
			date_applied: "04-23-2020",
			application_status: "pending",
		},
	];
}

export default async function Dashboard() {
	const tableData = await getData();

	return (
		<>
			<DashboardNavbar />

			<div className="container pt-5 pb-10">
				<DashBoardAddButton />
			</div>

			<div className="container pt-5">
				<DataTable columns={jobColumns} data={tableData} />
			</div>
		</>
	);
}
