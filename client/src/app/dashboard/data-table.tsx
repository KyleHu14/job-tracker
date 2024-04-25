"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface TableHeaderContainerProps {
	id: string;
	isPlaceholder: boolean;
	headerText: any; // Actual Type : ColumnDefTemplate<HeaderContext<TData, unknown>> | undefined
	headerContext: any; // Actual Type : CoreHeader<TData, unknown>.getContext: () => HeaderContext<TData, unknown>
}

function TableHeadContainer({
	id,
	isPlaceholder,
	headerText,
	headerContext,
}: TableHeaderContainerProps) {
	if (!isPlaceholder) {
		return (
			<TableHead key={id}>
				{flexRender(headerText, headerContext)}
			</TableHead>
		);
	}
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				{/* Table Header | Row 1 */}
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								// prettier-ignore
								return (
									<TableHeadContainer
										id={header.id}
										isPlaceholder={header.isPlaceholder}
										headerText={header.column.columnDef.header}
										headerContext={header.getContext()}
									/>
								);
							})}
						</TableRow>
					))}
				</TableHeader>

				{/* Table Body | Row 2 - N*/}
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
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
	);
}
