// [Importing]
// 1. Libraries
const express = require("express")
const cors = require("cors")

// 2. Middleware
const middleware = require("./utils/middleware")

// 3. Routers
const usersRouter = require("./controllers/users")

// [Initializing]

// 1. Creating Express app and setting up middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get("/api", (request, response) => {
	response.json({ message: "Welcome to the Job Tracker API." })
})

app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
