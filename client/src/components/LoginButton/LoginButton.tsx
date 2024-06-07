"use client"

import { Button } from "../ui/button"

import { signIn } from "next-auth/react"

type ActionFunction = () => Promise<void>

interface LoginButtonProps {
	actionFunction?: ActionFunction
}

export default function LoginButton({ actionFunction }: LoginButtonProps) {
	if (actionFunction) {
		return <Button onClick={actionFunction}>Login with Google</Button>
	}
	return (
		<Button
			onClick={() => {
				signIn("google", { callbackUrl: "/dashboard" })
			}}>
			Login with Google
		</Button>
	)
}
