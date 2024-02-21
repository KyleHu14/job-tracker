// Components
import ErrorMessage from "./ErrorMessage";
import EditModal from "./modals/EditModal";

// Styles
import s from "@/styles/components/Display.module.css";

// Supabase functions
import { delApp } from "@/supabase/supabase";

// React
import { useState } from "react";

// Next Components
import Image from "next/image";
import { useRouter } from "next/router";

// Interfaces
// This serves as the interface for the props that is passed into the JobApp component
interface JobAppProps {
	id: number,
	title: string,
	company_name: string,
	location: string,
	status: string,
	date: string,
	user_email: string,
	link: string
}

// This serves as the interface for props of the actual display component
interface displayProps{
	data : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string,
		user_email: string,
		link: string
	}[];
}

export default function Display({data} : displayProps) {
	// Initialize next router, used for refreshing page
	const router = useRouter();

	// Initialize various useStates
	const [showError, setShowError] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editJobId, setEditJobId] = useState(-1)
	const [editData, setEditData] = useState (
		{title: "", location: "", company_name: "", status : "", date : "", link: ""}
	)

	// Function that handles deleting of a job app
	const handleDel = async (appId: number, email: string, status: string) => {
		// 1. First call the delete app function
		let delErr = await delApp(appId, email, status)

		// 2. If we get any errors, show the error
		if (delErr){
			setShowError(true)
			console.error("Error", delErr)
		} 
		// 3. Otherwise, we can turn off the error and "refresh" the page w/ the router
		else {
			setShowError(false)
			router.replace(router.asPath)
		}
	}

	// Function that handles editing of a job app
	const handleEdit = (appId: number, title: string, location: string, company_name: string, status: string, date: string, link: string) => {
		// 1. Display the edit modal
		setIsEditModalOpen(true)

		// 2. Set the new id that will be passed into the modal
		setEditJobId(appId)
		// 3. Also set the data of the currently being edited job app in the form
		setEditData({title: title, location: location, company_name: company_name, status : status, date : date, link: link})
	}

	const openLink = (link: string) => {
		window.open(link, '_blank')
	}

	// JobApp serves as a container that displays all job application in a rectangle
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

				<button className={s.settingButton} onClick={() => handleEdit(props.id, props.title, props.location, props.company_name, props.status, props.date, props.link)}>
					<Image src="/icons/edit.jpg" alt="edit icon" width={30} height={30}/>
				</button>
				{ props.link && (
					<button className={s.settingButton} onClick={() => openLink(props.link)}>
						<Image src="/icons/link.jpg" alt="link icon" width={30} height={30}/>
					</button>
				)}
				
			</div>
		);
	}

	// 1. If there exists data, then display the component
	if (data && data.length > 0){
		return (
			<div className={s.displayContainer}>
				<>
					<div className={s.titleContainer}>Your Applications</div>
					{showError && (
						<div className={s.errorContainer}>An error occured with deleting an application. Try again later.</div>
					)}
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
								link={jobApp.link}
							/>
						</div>
					))}
				</>
				<EditModal id={editJobId} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editData={editData}/>
			</div>
		);
	} 
	// 2. If the data's length is 0, that means the user has no applications, display a message instead
	else if (data && data.length === 0){
		return (
			<>
				<div className={s.titleContainer}>Your Applications</div>
				<div className={s.emptyMessage}>
					<div className={s.emptyTitle}>Track your first job application!</div>
					<div className={s.emptySubTitle}>Go ahead and track a new application using the form above!</div>
				</div>
			</>
		)
	} 
	// 3. Otherwise, an error has occured, display error message
	else {
		return (
			<ErrorMessage />
		) 
	}
	
}

