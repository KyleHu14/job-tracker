const userRouter = require("express").Router()

// Services
const { getUsers, getUser, createUsers } = require("../services/users")

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
	try {
		const userData = await createUsers(request.body)
		response.status(201).json(userData)
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter
