import Head from 'next/head'

import { useEffect, useState } from "react";

// Components
import Form from "../components/Form"
import Display from "@/components/Display";
import Navbar from "@/components/Navbar";

// Supabase import
import { fetchApps } from "@/supabase/supabase"

// NextAuth
import { useSession } from "next-auth/react"

// Interface that is used for the server side rendered data
interface indexProps{
	data : {
		id: number,
		title: string,
		company_name: string,
		location: string,
		status: string,
		date: string
	}[],
}

export default function Home({ data} : indexProps) {
	// [Auth]
	const { data: session, status } = useSession()

	// [Use States]
	const [homePageText, setHomeText] = useState("Login to start tracking!")
	
	// [Use Effect]
	useEffect(() => {
		if (status === "loading") {
			setHomeText("Loading....");
		} else {
			setHomeText("Login to start tracking!");
		}
  	}, [status]);


	return (
		<>
			<Head>
				<title>JobTracker</title>
			</Head>
			<Navbar />
			<div>	
				{!session ? (
					<>{homePageText}</>
				):
				(
					<>
						<Form />
						<Display data={data} />
					</>
					
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(){
	const data = await fetchApps()

	if(data){
		return { props : {data} }
	}
}