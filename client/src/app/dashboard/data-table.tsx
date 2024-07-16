"use client"

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { JobActions } from "@/components/JobActions/JobActions"
import { EditText } from "react-edit-text"
import "react-edit-text/dist/index.css"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	idToken: string
}

export function DataTable<TData, TValue>({
	columns,
	data,
	idToken,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	// prettier-ignore
	const handleSave = (value: string , id: string, field: string) => {
		console.log(value)
		console.log(id)
		console.log(field)
	}

	return (
		<>
			<div className="rounded-md border">
				<Table>
					{/* Row 1 of Table */}
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>

					{/* Everything else of the table */}
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}>
									{/* For each row, filter out cells that have the link & job id */}
									{row
										.getVisibleCells()
										.filter(
											(cell) =>
												!cell.id.includes("_link") &&
												!cell.id.includes("_job_id")
										)
										.map((cell) => (
											// This is where each cell of the table is rendered
											<TableCell key={cell.id}>
												{/* Allows for on click editing of values */}
												<EditText
													name="cellDisplay"
													defaultValue={cell.getValue<string>()}
													// prettier-ignore
													onSave={({ value }: { value: string }) => {
														handleSave(
															value,
															row.getValue("job_id"),
															cell.column.id
														)
													}}
												/>
											</TableCell>
										))}
									<TableCell></TableCell>
									<TableCell className="px-0 inline-block">
										<JobActions
											jobId={row.getValue("job_id")}
											link={row.getValue("link")}
											idToken={idToken}
										/>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
