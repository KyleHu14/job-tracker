import { auth } from "../auth";

export default async function DashboardNavbar() {
	const session = await auth();

	if (!session?.user) return null;

	return (
		<nav className="flex justify-between p-5 border-b-2">
			<a href="/dashboard">JobTracker</a>
			<div>{session.user.name}</div>
		</nav>
	);
}
