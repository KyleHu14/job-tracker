const usersRouter = require("express").Router()

// Services
const { getUsers, getUser, createUsers } = require("../services/supabase/users")

// Logger
// const logger = require("../utils/logger")

usersRouter.get("/", async (request, response) => {
	const userData = await getUsers()
	response.json(userData)
})

usersRouter.get("/:email", async (request, response) => {
	const userData = await getUser(request.params.email)
	if (userData.length > 0) {
		response.json(userData)
	} else {
		response.status(404).end()
	}
})

usersRouter.post("/", async (request, response) => {
	const userData = await createUsers(request.body)
	response.status(201).json(userData)
})

module.exports = usersRouter
