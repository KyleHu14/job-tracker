const jobsRouter = require("express").Router()

const {
	getJobApps,
	getUserJobApps,
	createJobApps,
} = require("../services/supabase/jobapps")

const { verify } = require("../services/google/tokenVerification")
const getTokenFrom = require("../utils/getToken")

jobsRouter.post("/", async (request, response) => {
	const body = request.body
	const requestToken = getTokenFrom(request)

	await verify(requestToken)

	const createData = await createJobApps([body])

	response.status(201).json(createData)
})

jobsRouter.get("/", async (request, response) => {
	const jobApplicationData = await getJobApps()

	response.json(jobApplicationData)
})

jobsRouter.get("/:userId", async (request, response) => {
	const userJobApps = await getUserJobApps(request.params.userId)

	response.json(userJobApps)
})

jobsRouter.delete("/", async (request, response) => {
	const { jobId } = request.body // Assuming jobId is also passed in the body
	const requestToken = getTokenFrom(request)

	try {
		await verify(requestToken)

		const deleteResult = await deleteJobApp(jobId) // Assume deleteJobApp takes userId and jobId

		if (deleteResult) {
			response.status(204).end() // No Content
		} else {
			response.status(404).json({ error: "Job application not found" })
		}
	} catch (error) {
		response.status(401).json({ error: "Unauthorized" })
	}
})

module.exports = jobsRouter
