// Next component
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';

// React
import { useEffect, useState } from "react";

// Components
import CreateModal from "../components/CreateModal"
import Display from "@/components/Display";
import Navbar from "@/components/Navbar";
import LoginBtn from "@/components/LoginBtn"

// Supabase import
import { fetchApps, fetchStats } from "@/supabase/supabase"

// NextAuth
import { useSession } from "next-auth/react"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// CSS
import s from "@/styles/pages/Index.module.css";

// Interface that is used for the server side rendered data
interface indexProps{
	userApplications : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string
	}[]
	userStats : {
		id: number,
		email: string,
		total_apps: string,
		rejected_apps: string,
		pending_apps: string,
		accepted_apps: string
	}[]
}

export default function Home({userApplications, userStats} : indexProps) {
	// [NextAuth]
	const { data: session } = useSession()

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

	return (
		<>
			<Head>
				<title>JobTracker</title>
			</Head>
			<Navbar session={session}/>
			<div>	
				{!session || !session.user ? (
					<>
						<div className={s.homeContainer}>
							<div className={s.title}>Organize your Job Applications</div>
							<div className={s.subTitle}>Manage and organize your job hunt all in one place.</div>
							<LoginBtn session={session}/>
						</div>
						
					</>
				):
				(
					<div className={s.mainContainer}>
						<>
							<div className={s.titleContainer}>Your Progress</div>
							<div className={s.stats}>
								<div><span className={s.accept}>Accepted✅</span> : {userStats[0].accepted_apps}</div>
								<div><span className={s.reject}>Rejected❌</span> : {userStats[0].rejected_apps}</div>
								<div><span className={s.pending}>Pending</span> : {userStats[0].pending_apps}</div>
								<div><span className={s.pending}>Total</span> : {userStats[0].total_apps}</div>
							</div>
							
							<button className={s.createAppBtn} onClick={() => setIsCreateModalOpen(true)}>+ Application</button>
						</>
						<CreateModal email={session.user.email ?? ""} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}/>
						<Display data={userApplications} />
					</div>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext){
	const session = await getServerSession(context.req, context.res, authOptions)

	const userApplications = await fetchApps(session?.user?.email)

	let userStats = await fetchStats(session?.user?.email)

	return {
		props: {
			userApplications,
			userStats,
		  	session,
		},
	}
}