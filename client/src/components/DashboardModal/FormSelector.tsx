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

interface option {
	displayValue: string
	storedValue: string
}

interface SelectorProps {
	selectedValue: string
	setSelectedValue: Dispatch<SetStateAction<string>>
	options: option[]
	placeholderValue: string
	title: string
}

export function FormSelector({
	selectedValue,
	setSelectedValue,
	options,
	placeholderValue,
	title,
}: SelectorProps) {
	return (
		<Select
			value={selectedValue}
			onValueChange={(value) => setSelectedValue(value)}>
			<SelectTrigger>
				<SelectValue placeholder={placeholderValue} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{title}</SelectLabel>
					{options.map((option) => {
						return (
							<SelectItem
								key={option.storedValue}
								value={option.storedValue}>
								{option.displayValue}
							</SelectItem>
						)
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
