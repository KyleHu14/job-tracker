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

	// Use states
	const [formData, setFormData] = useState({
		status: "",
		startDate: "",
		jobTitle: "",
		location: "",
		company: "",
		email: email,
	});

	const [dateErrMsg, setDateErrMsg] = useState(false)
	const [showGeneralErrMsg, setShowGeneralErrMsg] = useState(false)
	const [generalErrMsg, setGeneralErrMsg] = useState("")


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

	// Validates if a string fits the format MM/DD/YYYY
	const validateDate = (dateStr: string): boolean => {
		const date = new Date(dateStr)
		return !isNaN(date.getTime());
	}

	// Validates entire form's contents
	const checkForm = (formInfo: any) => {
		let formStatus = true

		// 1. First check if there are any blank values
		for(let key in formInfo){
			if(formInfo[key] == ""){
				setShowGeneralErrMsg(true)
				setGeneralErrMsg("One or more fields are empty.")
				formStatus = false
			}
		}

		// 2. Check if the date is valid or not
		if(!validateDate(formData.startDate)){
			setDateErrMsg(true)
			formStatus = false
		}
		
		// 3. Check if the email field exists
		if(email === ""){
			setGeneralErrMsg("We are unable to detect you are logged in. Please try refreshing the page.")
			formStatus = false
		}

		return formStatus
	}

	// Function that handles the submission of a form
	// Creates an application in supabase and refreshes the page 
	// By refreshing the page, we invoke getServerSideProps and refresh the data
	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// If the form data fails (returns false), then we return early on and don't create a new task
		if(!checkForm(formData)){
			return false
		}

		// If we are here, we can remove the error message since it passed our check
		setDateErrMsg(false)
		setShowGeneralErrMsg(false)

		// Create the data in the supabase database

		let createError = await createApp(formData);
		
		if (createError) {
			console.error('Error creating application', createError)
			setGeneralErrMsg("An error occured when creating a new application. Please try again later.")
			setShowGeneralErrMsg(true)
			return false
		}
		

		// On submission, reset the form
		setFormData({
			status: "",
			startDate: "",
			jobTitle: "",
			location: "",
			company: "",
			email: email
		})

		// Refreshes the page and therefore calls the getServerSideProps function
		router.replace(router.asPath);
	}

	return (
		<form className={s.form}  onSubmit={handleFormSubmit}>
			<div className={s.title}>New Job Application</div>

			<div className={s.inputContainer}>
				<div>Job Title</div>
				<input 
					value={formData.jobTitle}
					className={s.formInput} 
					placeholder="Junior Developer" 
					onChange={(e) => updateFormData("jobTitle", e.target.value)}
				></input>
			</div>

			<div className={s.inputContainer}>
				<div>Location</div>
				<input 
					value={formData.location}
					className={s.formInput} 
					placeholder="Irvine, California"
					onChange={(e) => updateFormData("location",e.target.value)}
				></input>
			</div>

			<div className={s.inputContainer}>
				<div>Company</div>
				<input 
					value={formData.company}
					className={s.formInput} 
					placeholder="Amazon"
					onChange={(e) => updateFormData("company",e.target.value)}
				></input>
			</div>

			<div className={s.inputContainer}>
				<div>Date</div>
				<input 
					value={formData.startDate}
					className={s.formInput} 
					placeholder="8/2/2023"
					onChange={(e) => updateFormData("startDate", e.target.value)}
				></input>
				{dateErrMsg && <div className={s.errorMsg}>Date is invalid</div>}
			</div>

			<div className={s.inputContainer}>
				<div>Status</div>
				<Select
					instanceId={"StatusSelector"}
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

			{showGeneralErrMsg && (<div className={s.errorMsg}>{generalErrMsg}</div>)}

			<button className={s.createBtn} type="submit">Add Application</button>
		</form>
	);
}
