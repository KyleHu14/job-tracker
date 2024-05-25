const jobsRouter = require("express").Router()

const { getJobApps, getUserJobApps } = require("../services/jobapps")

jobsRouter.get("/", async (request, response) => {
	const jobApplicationData = await getJobApps()

	response.json(jobApplicationData)
})

jobsRouter.get("/:userId", async (request, response) => {
	const userJobApps = await getUserJobApps(request.params.userId)

	response.json(userJobApps)
})

module.exports = jobsRouter
