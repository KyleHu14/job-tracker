// Components
import ErrorMessage from "./ErrorMessage";

// Styles
import s from "@/styles/components/Display.module.css";
import { delApp } from "@/supabase/supabase";

// React
import { useState } from "react";

// Next Components
import Image from "next/image";
import { useRouter } from "next/router";
import EditModal from "./modals/EditModal";

// Interfaces
interface JobAppProps {
	id: number,
	title: string,
	company_name: string,
	location: string,
	status: string,
	date: string,
	user_email: string
}

interface displayProps{
	data : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string,
		user_email: string
	}[];
}


export default function Display({data} : displayProps) {
	const router = useRouter();

	const [showError, setShowError] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editData, setEditData] = useState(
		{title: "", location: "", company_name: "", status : "", date : ""}
	)
	const [editJobId, setEditJobId] = useState(-1)

	// Functions for delete & edit
	const handleDel = async (appId: number, email: string, status: string) => {
		// console.log(appId)
		
		let delErr = await delApp(appId, email, status)

		if (delErr){
			setShowError(true)
			console.log("Error", delErr)
		} else {
			setShowError(false)
			router.replace(router.asPath)
		}
	}

	const handleEdit = (appId: number, title: string, location: string, company_name: string, status: string, date: string) => {
		// Display the edit modal
		setIsEditModalOpen(true)

		// Set the new id that will be passed into the modal
		setEditJobId(appId)
		setEditData({title: title, location: location, company_name: company_name, status : status, date : date})
	}

	// JobApp is just another component, it serves as a container that contains all job application info
	function JobApp(props: JobAppProps) {
		return (
			<div className={s.appContainer}>
				<div>{props.title}</div>
				<div>{props.location}</div>
				<div>{props.company_name}</div>
				<div>{props.status}</div>
				<div>{props.date}</div>

				<button className={s.settingButton} onClick={() => handleDel(props.id, props.user_email, props.status)}>
					<Image src="/icons/delete.jpg" alt="trash can icon" width={30} height={30}/>
				</button>

				<button className={s.settingButton} onClick={() => handleEdit(props.id, props.title, props.location, props.company_name, props.status, props.date)}>
					<Image src="/icons/edit.jpg" alt="edit icon" width={30} height={30}/>
				</button>

				<button className={s.settingButton}>
					<Image src="/icons/link.jpg" alt="link icon" width={30} height={30}/>
				</button>
			</div>
		);
	}

	if (data && data.length > 0){
		return (
			<div className={s.displayContainer}>
				<>
					<div className={s.titleContainer}>Your Applications</div>
					{showError && (<div className={s.errorContainer}>An error occured with deleting an application. Try again later.</div>)}
					{data.map((jobApp) => (
						<div key={jobApp.id}>
							<JobApp
								id={jobApp.id}
								status={jobApp.status}
								date={jobApp.date}
								title={jobApp.title}
								location={jobApp.location}
								company_name={jobApp.company_name}
								user_email={jobApp.user_email}
							/>
						</div>
					))}
				</>
				<EditModal id={editJobId} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editData={editData}/>
			</div>
		);
	} else if (data && data.length === 0){
		return (
			<>
				<div className={s.titleContainer}>Your Applications</div>
				<div className={s.emptyMessage}>
					<div className={s.emptyTitle}>Track your first job application!</div>
					<div className={s.emptySubTitle}>Go ahead and track a new application using the form above!</div>
				</div>
			</>
		)
	} else {
		return (
			<ErrorMessage />
		) 
	}
	
}

