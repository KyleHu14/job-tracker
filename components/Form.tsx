// CSS
import s from "@/styles/components/Form.module.css";

// React
import { useState } from "react";

// Router
import { useRouter } from 'next/router'

// supabase function
import { createApp } from "@/supabase/supabase";

// React-select
import Select from "react-select";

// React-select formatting options
const optionList = [
	{ value: "pending", label: "Pending" },
	{ value: "rejected", label: "Rejected" },
	{ value: "accepted", label: "Accepted" },
];

// Interface for Form props
interface FormProps {
	email: string
}

export default function Form({ email } : FormProps) {
	// Next Router
	const router = useRouter();

	// Form input use states
	const [formData, setFormData] = useState({
		status: "",
		startDate: "",
		jobTitle: "",
		location: "",
		company: "",
		email: email,
	});

	//   A function that sets the correct attribute of the formData useState
	const updateFormData = (field: keyof typeof formData, value: string) => {
		setFormData((formData) => ({
			...formData,
			[field]: value,
		}));
	};

	// Updates the status, we use a separate function since we need to check if status is a value or not
	const updateStatus = (newStatusObject: any) => {
		if (newStatusObject) {
			updateFormData("status", newStatusObject.value);
		}
	};

	// Refreshes page and calls the SSR function of index.tsx
	const refreshData = () => {
		router.replace(router.asPath);
	}

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createApp(formData);

		// On submission, reset the form
		setFormData({
			status: "",
			startDate: "",
			jobTitle: "",
			location: "",
			company: "",
			email: email
		})

		refreshData();
	}

	return (
		<form className={s.form} onSubmit={handleFormSubmit}>
			<div className={s.title}>New Job Application</div>

			<div>
				<div>Job Title</div>
				<input 
					className={s.formInput} 
					placeholder="Junior Developer" 
					onChange={(e) => updateFormData("jobTitle", e.target.value)}
				></input>
			</div>

			<div>
				<div>Location</div>
				<input 
					className={s.formInput} 
					placeholder="Irvine, California"
					onChange={(e) => updateFormData("location",e.target.value)}
				></input>
			</div>

			<div>
				<div>Company</div>
				<input 
					className={s.formInput} 
					placeholder="Amazon"
					onChange={(e) => updateFormData("company",e.target.value)}
				></input>
			</div>

			<div>
				<div>Date</div>
				<input 
					className={s.formInput} 
					placeholder="8/2/2023"
					onChange={(e) => updateFormData("startDate", e.target.value)}
				></input>
			</div>

			<div>
				<div>Status</div>
				<Select
					options={optionList}
					onChange={(newStatus) => updateStatus(newStatus)}
					placeholder="Select status"
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							fontSize: "15px",
						}),
						menu: (base) => ({
							...base,
							fontSize: "15px",
						}),
					}}
				/>
			</div>

			<button className={s.createBtn} type="submit">Add Application</button>
		</form>
	);
}
