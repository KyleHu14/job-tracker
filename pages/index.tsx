import { useSession } from "next-auth/react"

import Head from 'next/head'

import { useEffect, useState } from "react";

// Components
import Form from "../components/Form"

export default function Home() {
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
			<div>	
				{!session ? (
					<>{homePageText}</>
				):
				(
					<Form />
				)}
			</div>
		</>
	);
}
