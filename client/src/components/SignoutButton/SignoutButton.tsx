"use client"

import { Button } from "../ui/button"

import { signOut } from "next-auth/react"

type ActionFunction = () => Promise<void>

interface SignoutButtonProps {
	actionFunction?: ActionFunction
}

export default function SignoutButton({ actionFunction }: SignoutButtonProps) {
	if (actionFunction) {
		return <button onClick={actionFunction}>Sign Out</button>
	}
	return (
		<button
			onClick={() => {
				signOut({ callbackUrl: "/" })
			}}>
			Sign Out
		</button>
	)
}
