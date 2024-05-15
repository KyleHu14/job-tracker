import Navbar from "@/components/HomeNavbar";

async function getNotes() {
	const res = await fetch(`http://localhost:3001/api/notes`);
	return res.json();
}

export default async function Home() {
	const notesData = getNotes();

	const [notes] = await Promise.all([notesData]);

	return (
		<main className="px-96">
			<Navbar />
			<div>{notes[0].content}</div>
			<h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
				Get started by logging in!
			</h1>
		</main>
	);
}
