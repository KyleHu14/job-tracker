import { signIn } from "@/auth";

import { Button } from "./ui/button";

export default function LoginButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google", { redirectTo: "/dashboard" });
			}}>
			<Button type="submit">Login with Google</Button>
		</form>
	);
}
