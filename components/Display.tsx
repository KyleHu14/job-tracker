import s from "@/styles/components/Display.module.css";

import Image from "next/image";

interface JobAppProps {
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
	// JobApp is just another component, it serves as a container that contains all job application info
	function JobApp(props: JobAppProps) {
		return (
			<div className={s.appContainer}>
				<div>{props.jobTitle}</div>
				<div>{props.location}</div>
				<div>{props.company}</div>
				<div>{props.status}</div>
				<div>{props.startDate}</div>

				<button>
					<Image src="/icons/delete.jpg" alt="trash can icon" width={30} height={30}/>
				</button>

				<button>
					<Image src="/icons/edit.jpg" alt="edit icon" width={30} height={30}/>
				</button>

				<button>
					<Image src="/icons/link.jpg" alt="link icon" width={30} height={30}/>
				</button>
			</div>
		);
	}

	return (
		<>
			{data.map((jobApp) => (
				<div key={jobApp.id}>
					<JobApp
						status={jobApp.status}
						startDate={jobApp.date}
						jobTitle={jobApp.title}
						location={jobApp.location}
						company={jobApp.company_name}
					/>
				</div>
			))}
		</>
	);
}

