import s from "@/styles/components/Display.module.css";

import Image from "next/image";

interface JobAppProps {
	status: string;
	startDate: string;
	jobTitle: string;
	location: string;
	company: string;
}

export default function Display() {
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
		<div>
			<JobApp
				status={"Pending"}
				startDate={"04/23/1999"}
				jobTitle={"Software Engineer"}
				location={"New York City, NY"}
				company={"Amazon"}
			/>
			<JobApp
				status={"Pending"}
				startDate={"04/23/1999"}
				jobTitle={"Software Engineer"}
				location={"New York City, NY"}
				company={"Google"}
			/>
		</div>
	);
}
