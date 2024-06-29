import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"

interface SelectProps {
	applicationStatus: string
	setStatus: Dispatch<SetStateAction<string>>
}

export function SelectEmploymentType({
	applicationStatus,
	setStatus,
}: SelectProps) {
	return (
		<Select
			value={applicationStatus}
			onValueChange={(value) => setStatus(value)}>
			<SelectTrigger>
				<SelectValue placeholder="Full Time" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Employment Type</SelectLabel>
					<SelectItem value="fullTime">Full Time</SelectItem>
					<SelectItem value="partTime">Part Time</SelectItem>
					<SelectItem value="internship">Internship</SelectItem>
					<SelectItem value="contract">Contract</SelectItem>
					<SelectItem value="freelance">Freelance</SelectItem>
					<SelectItem value="other">Other</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
