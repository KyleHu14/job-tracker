// [Importing]
// 1. Libraries
const express = require("express")
require("express-async-errors")

const cors = require("cors")

// 2. Middleware
const middleware = require("./utils/middleware")

// 3. Routers
const jobsRouter = require("./controllers/jobapps")

// [Initializing]

// 1. Creating Express app and setting up middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get("/api", (request, response) => {
	response.json({ message: "Welcome to the Job Tracker API." })
})

// For now, we will not use the users route, since this doesnt have correct auth implemented
// app.use("/api/users", usersRouter)
app.use("/api/jobapps", jobsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
