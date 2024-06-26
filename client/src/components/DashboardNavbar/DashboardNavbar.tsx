import { auth } from "@/auth"

import Image from "next/image"

import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar"
import SignoutButton from "../SignoutButton/SignoutButton"

export default async function DashboardNavbar() {
	const session = await auth()

	if (!session?.user || !session?.user.image) return null

	return (
		<nav className="flex justify-between items-center px-5 py-2 border-b-2">
			<a href="/dashboard">JobTracker</a>
			{/* User Drop Down Menu */}
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>
						<Image
							className="rounded-full cursor-pointer"
							src={session.user.image}
							alt="User Avatar"
							width="40"
							height="40"
						/>
						{/* <img
							className="w-10 h-10 rounded-full cursor-pointer"
							src={session.user.image}
							alt="User Avatar"
						/> */}
					</MenubarTrigger>
					<MenubarContent>
						<div className="px-2">
							{/* User Information */}
							<div className="flex flex-col mt-1.5">
								<div className="text-[0.95rem]">
									{session.user.name}
								</div>
								<div className="text-[0.8rem] text-gray-500">
									{session.user.email}
								</div>
							</div>

							{/* Line */}
							<MenubarSeparator />

							{/* Sign Out Button */}
							<SignoutButton />
						</div>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</nav>
	)
}
