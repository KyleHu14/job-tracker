const jobsRouter = require("express").Router()

const { getJobApps, getUserJobApps } = require("../services/supabase/jobapps")

const { verify } = require("../services/google/tokenVerification")
const getTokenFrom = require("../utils/getToken")

jobsRouter.post("/", async (request, response) => {
	const body = request.body
	const requestToken = getTokenFrom(request)

	await verify(requestToken)

	response.json("Hello")
})

jobsRouter.get("/", async (request, response) => {
	const jobApplicationData = await getJobApps()

	response.json(jobApplicationData)
})

jobsRouter.get("/:userId", async (request, response) => {
	const userJobApps = await getUserJobApps(request.params.userId)

	response.json(userJobApps)
})

module.exports = jobsRouter
