import { TableCell } from "../ui/table"
import { Row, flexRender } from "@tanstack/react-table"

interface Props<TData> {
	row: Row<TData>
}

export default function DataRow<TData>({ row }: Props<TData>) {
	// prettier-ignore
	return (
		<>
			{row.getVisibleCells().filter(
					(cell) =>
						!cell.id.includes("_link") &&
						!cell.id.includes("_job_id")
				)
				.map((cell) => (
					// This is where each cell of the table is rendered
					<RenderCell cellId={cell.id} cellValue={cell.getValue<string>()}/>
					// <TableCell key={cell.id}>
					// 	{cell.getValue<string>()}
					// </TableCell>
				))}
		</>
	)
}

interface RenderCellProps {
	cellId: string
	cellValue: string
}

function RenderCell({ cellId, cellValue }: RenderCellProps) {
	const displayValue: { [key: string]: string } = {
		full_time: "Full Time",
		part_time: "Part Time",
		internship: "Internship",
		contract: "Contract",
		freelance: "Freelance",
		other: "Other",
	}

	if (cellId.includes("employment_type")) {
		return <TableCell key={cellId}>{displayValue[cellValue]}</TableCell>
	} else if (cellId.includes("application_status")) {
		return (
			<TableCell key={cellId}>
				{cellValue.charAt(0).toUpperCase() + cellValue.slice(1)}
			</TableCell>
		)
	} else {
		return <TableCell key={cellId}>{cellValue}</TableCell>
	}
}
