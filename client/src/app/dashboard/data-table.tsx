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

import DataRow from "@/components/DataRow/DataRow"

import { JobActions } from "@/components/JobActions/JobActions"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	idToken: string
}

// prettier-ignore
export function DataTable<TData, TValue>({ columns, data, idToken, }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})



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
								// Render the row of the table
								<TableRow key={row.id} data-state={ row.getIsSelected() && "selected" }>
									
									{/* 1. First render the cells that contain data */}
									<DataRow row={row}/>

									{/* 2. This section is for cells that handle job actions */}
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
