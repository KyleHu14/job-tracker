const jobsRouter = require("express").Router()

const { getJobApps } = require("../services/jobapps")

jobsRouter.get("/", async (request, response) => {
	const jobApplicationData = await getJobApps()

	response.json(jobApplicationData)
})

module.exports = jobsRouter
