// CSS
import s from "@/styles/components/CreateModal.module.css";

// React
import { useEffect, useState } from "react";

// Router
import { useRouter } from 'next/router'

// supabase function
import { updateApp } from "@/supabase/supabase";

// React-select
import Select from "react-select";

// Modal
import Modal from "@/components/Modal"

// React-select formatting options
const optionList = [
	{ value: "pending", label: "Pending" },
	{ value: "rejected", label: "Rejected" },
	{ value: "accepted", label: "Accepted" },
];

// 9/25/2023 Learned something new, index signatures
const optionIndex: {[key: string] : number} = {
    pending : 0,
    rejected : 1,
    accepted : 2
}

// Interface for Form props
interface FormProps {
	id: number;
	isOpen: boolean;
 	onClose: () => void;
    editData : {
        title: string, 
        location: string, 
        company_name: string, 
        status: string, 
        date: string
    }
}

export default function EditModal({ id, isOpen, onClose, editData } : FormProps) {
	// Next Router
	const router = useRouter();

	// Use states
	const [formData, setFormData] = useState({
		status: "",
		startDate: "",
		jobTitle: "",
		location: "",
		company: "",
	});

	const [dateErrMsg, setDateErrMsg] = useState(false)
	const [showGeneralErrMsg, setShowGeneralErrMsg] = useState(false)
	const [generalErrMsg, setGeneralErrMsg] = useState("")

	// Added the useEffect, this way formData will immediately change when editData has new values that are passed into the component
	useEffect(() => {
		setFormData({
		  status: editData.status,
		  startDate: editData.date,
		  jobTitle: editData.title,
		  location: editData.location,
		  company: editData.company_name,
		});
	}, [editData]); // Make sure editData is listed as a dependency

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
		let updateError = await updateApp(id, formData.jobTitle, formData.company, formData.location, formData.status, formData.startDate);
		
		// if (createError) {
		// 	console.error('Error creating application', createError)
		// 	setGeneralErrMsg("An error occured when creating a new application. Please try again later.")
		// 	setShowGeneralErrMsg(true)
		// 	return false
		// }
		
		// On submission, reset the form
		setFormData({
			status: "",
			startDate: "",
			jobTitle: "",
			location: "",
			company: "",
		})

		// Refreshes the page and therefore calls the getServerSideProps function
		router.replace(router.asPath)
        // Close the form, since the user most likely just wants to edit the application and exit
        onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
				<form className={s.form}  onSubmit={handleFormSubmit}>
					<div className={s.title}>Edit Job Application</div>
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
                            defaultValue={optionList[optionIndex[formData.status]]}
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
					<div className={s.buttonRow}>
						<button className={s.createBtn} type="submit">Edit Application</button>
						<button className={s.closeBtn} onClick={() => onClose()}>Exit</button>
					</div>
					
				</form>
		</Modal>
	);
}
