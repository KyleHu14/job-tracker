// Next component
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';

// React
import { useEffect, useState } from "react";

// Components
import Form from "../components/Form"
import Display from "@/components/Display";
import Navbar from "@/components/Navbar";
import LoginBtn from "@/components/LoginBtn"

// Supabase import
import { fetchApps } from "@/supabase/supabase"

// NextAuth
import { useSession } from "next-auth/react"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// CSS
import s from "@/styles/pages/Index.module.css";

// Interface that is used for the server side rendered data
interface indexProps{
	data : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string
	}[]
}

export default function Home({data} : indexProps) {
	// [NextAuth]
	const { data: session } = useSession()

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
					<>
						<Form email={session.user.email ?? ""}/>
						<Display data={data} />
					</>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext){
	const session = await getServerSession(context.req, context.res, authOptions)

	const data = await fetchApps(session?.user?.email)

	return {
		props: {
			data,
		  	session,
		},
	}
}