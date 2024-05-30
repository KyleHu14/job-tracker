import { signOut } from "@/auth"
import { auth } from "@/auth"

import Image from "next/image"

import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar"

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
						{/* User Information */}
						<div className="flex flex-col mt-1.5">
							<div className="px-2 text-[0.95rem]">
								{session.user.name}
							</div>
							<div className="px-2 text-[0.8rem] text-gray-500">
								{session.user.email}
							</div>
						</div>

						{/* Line */}
						<MenubarSeparator />

						{/* Sign Out Button */}

						<form
							action={async () => {
								"use server"
								console.log("Trigger")
								await signOut({
									redirect: true,
									redirectTo: "/",
								})
							}}
							className="w-full px-2 text-[0.85rem]">
							<button>Sign Out</button>
						</form>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</nav>
	)
}
