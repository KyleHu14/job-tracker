"use client"

import React, { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

interface Props {
	modalTitle: string
	modalDesc: string
	buttonText: string
	submitFunction: () => Promise<void>
	children: ReactNode
}

export function FormModal({
	modalTitle,
	modalDesc,
	buttonText,
	submitFunction,
	children,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="float-right">
					<Pencil className="mr-2 h-4 w-4" />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-full">
				{/* Header for Modal */}
				<DialogHeader>
					<DialogTitle>{modalTitle}</DialogTitle>
					<DialogDescription>{modalDesc}</DialogDescription>
				</DialogHeader>

				{/* Form Body */}
				<div className="mt-3 grid gap-4">{children}</div>

				{/* Submit Button */}
				<DialogFooter>
					<DialogClose asChild>
						<Button type="submit" onClick={submitFunction}>
							{buttonText}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
