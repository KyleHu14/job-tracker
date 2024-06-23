import Navbar from "@/components/HomeNavbar/HomeNavbar"

export default async function Home() {
	return (
		<main className="px-96">
			<Navbar />
			{/* <div>{notes[0].content}</div> */}
			<h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
				Get started by logging in!
			</h1>
		</main>
	)
}
