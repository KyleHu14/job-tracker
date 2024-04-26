import { auth } from "../auth";

export default async function DashboardNavbar() {
	const session = await auth();

	if (!session?.user) return null;

	return <div>{session.user.email}</div>;
}
