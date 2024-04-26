import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";

type NavbarLinkProps = {
	className?: string;
	href: string;
	children: React.ReactNode;
};

// Individual NavLink used in Navbar component
function NavbarLink({ className, href, children }: NavbarLinkProps) {
	return (
		<Link
			className={cn(
				"font-medium transition-colors hover:text-primary",
				className
			)}
			href={href}>
			{children}
		</Link>
	);
}

export default function HomeNavbar() {
	return (
		<nav className="flex items-center justify-between py-5">
			<NavbarLink className="text-lg" href="/">
				JobTracker 3.0
			</NavbarLink>
			<LoginButton />
		</nav>
	);
}
