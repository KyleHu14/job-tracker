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

// Interfaces
interface JobAppProps {
	id: number;
	status: string;
	startDate: string;
	jobTitle: string;
	location: string;
	company: string;
}

interface displayProps{
	data : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string
	}[];
}


export default function Display({data} : displayProps) {
	const router = useRouter();

	const [showError, setShowError] = useState(false)

	// Functions for delete & edit
	const handleDel = async (appId: number) => {
		// console.log(appId)
		
		let delErr = await delApp(appId)

		if (delErr){
			setShowError(true)
			console.log("Error", delErr)
		} else {
			setShowError(false)
			router.replace(router.asPath)
		}
	}

	const handleEdit = () => {

	}

	// JobApp is just another component, it serves as a container that contains all job application info
	function JobApp(props: JobAppProps) {
		return (
			<div className={s.appContainer}>
				<div>{props.jobTitle}</div>
				<div>{props.location}</div>
				<div>{props.company}</div>
				<div>{props.status}</div>
				<div>{props.startDate}</div>

				<button className={s.settingButton} onClick={() => handleDel(props.id)}>
					<Image src="/icons/delete.jpg" alt="trash can icon" width={30} height={30}/>
				</button>

				<button className={s.settingButton}>
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
								startDate={jobApp.date}
								jobTitle={jobApp.title}
								location={jobApp.location}
								company={jobApp.company_name}
							/>
						</div>
					))}
				</>
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

