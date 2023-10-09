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
        date: string,
		link: string
    }
}

/*
	Props :
	id -> This is used when editing a job application, its the only way to uniquely identify a job application
	isOpen / onClose -> isOpen is passed into the modal component, whereas onClose is called to close the modal itself
	editData -> This is the data that is currently being edited
*/
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
		link: ""
	});

	const [dateErrMsg, setDateErrMsg] = useState(false)
	const [showGeneralErrMsg, setShowGeneralErrMsg] = useState(false)
	const [generalErrMsg, setGeneralErrMsg] = useState("")

	// UseEffect allows us to update formData upon any change detected in editData
	useEffect(() => {
		setFormData({
		  status: editData.status,
		  startDate: editData.date,
		  jobTitle: editData.title,
		  location: editData.location,
		  company: editData.company_name,
		  link: editData.link
		});
	}, [editData]); 

	// Given a single key and value, the function updates the formData use state
	const updateFormData = (field: keyof typeof formData, value: string) => {
		setFormData((formData) => ({
			...formData,
			[field]: value,
		}));
	};

	// We use a separate function for updating status
	// We do this because you can't just pass in newStatusObject.value directly in the TSX for some reason..
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
			if(key !== "link" && formInfo[key] == ""){
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

		// 1. Check form contents first, if there's a problem we don't want to run the rest of the function
		if(!checkForm(formData)){
			return false
		}

		// 2. If form contents are good, we can remove the error message since it passed our check
		setDateErrMsg(false)
		setShowGeneralErrMsg(false)

		// 3. Create the data in the supabase database
		let updateError = await updateApp(id, formData.jobTitle, formData.company, formData.location, formData.status, formData.startDate, formData.link);

		// 4. If there is an error, do not continue with the rest of the function
		if (updateError) {
			setGeneralErrMsg("An error occured when updating the application. Please try again later.")
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
			link: ""
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
						<div>Link</div>
						<input 
							value={formData.link}
							className={s.formInput} 
							placeholder="https://link.com"
							onChange={(e) => updateFormData("link", e.target.value)}
						></input>
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
