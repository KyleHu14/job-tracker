import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SelectProps {
	applicationStatus: string;
	setStatus: Dispatch<SetStateAction<string>>;
}

export function SelectStatus({ applicationStatus, setStatus }: SelectProps) {
	return (
		<Select
			value={applicationStatus}
			onValueChange={(value) => setStatus(value)}>
			<SelectTrigger>
				<SelectValue placeholder="Pending" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Statuses</SelectLabel>
					<SelectItem value="pending">Pending</SelectItem>
					<SelectItem value="rejected">Rejected</SelectItem>
					<SelectItem value="interviewing">Interviewing</SelectItem>
					<SelectItem value="offer">Offer</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
