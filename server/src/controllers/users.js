const userRouter = require("express").Router()

// Services
const { getUsers, getUser, createUser } = require("../services/users")

// Logger
const logger = require("../utils/logger")

userRouter.get("/", async (request, response, next) => {
	try {
		const userData = await getUsers()
		response.json(userData)
	} catch (error) {
		next(error)
	}
})

userRouter.get("/:email", async (request, response, next) => {
	try {
		const userData = await getUser(request.params.email)
		response.json(userData)
	} catch (error) {
		next(error)
	}
})

userRouter.post("/", async (request, response, next) => {
	const { userName, emailAddress } = request.body
	try {
		const userData = await createUser([
			{ email_address: emailAddress, user_name: userName },
		])
		response.json(userData)
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter
