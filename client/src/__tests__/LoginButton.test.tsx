import { expect, test, vi } from "vitest"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import LoginButton from "@/components/LoginButton/LoginButton"

test("Login Button has correct behavior when rendered & clicked", async () => {
	// [Setup]
	// 1. Create a user
	const user = userEvent.setup()

	// 2. Create a mock function that will be passed into the Login Button
	// type ActionFunction = () => Promise<void>
	const mockLoginFunction = vi.fn(async () => {})

	// 3. Render the Button
	render(<LoginButton actionFunction={mockLoginFunction} />)

	// [Testing]
	// 1. Get the Button
	const loginButton = screen.getByText("Login with Google")

	// 1.5. Make sure loginButton works
	expect(loginButton).toBeDefined()

	// 2. Simulate a click
	await user.click(loginButton)

	// 3. Verify that button has been clicked once
	expect(mockLoginFunction.mock.calls.length).toBe(1)
})
