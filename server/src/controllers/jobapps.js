const jobsRouter = require("express").Router()

const {
	getJobApps,
	getUserJobApps,
	createJobApps,
	deleteJobApp,
	editJobApp,
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

jobsRouter.put("/:jobId", async (request, response) => {
	const requestToken = getTokenFrom(request)
	await verify(requestToken)

	const body = request.body

	const editData = await editJobApp(request.params.jobId, body)

	response.status(200).json(editData)
})

jobsRouter.get("/:userId", async (request, response) => {
	const userJobApps = await getUserJobApps(request.params.userId)

	response.json(userJobApps)
})

jobsRouter.get("/", async (request, response) => {
	const jobApps = await getJobApps()

	response.json(jobApps)
})

jobsRouter.delete("/:jobId", async (request, response) => {
	const requestToken = getTokenFrom(request)

	await verify(requestToken)

	const deleteResult = await deleteJobApp(request.params.jobId) // Assume deleteJobApp takes userId and jobId

	response.status(200).end()
})

module.exports = jobsRouter
