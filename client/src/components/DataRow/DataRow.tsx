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
					<TableCell key={cell.id}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
		</>
	)
}
