const logger = require("./logger")

const requestLogger = (request, response, next) => {
	logger.info(`[ Request Information ]`)
	logger.info(`  Method : ${request.method}`)
	logger.info(`  Path : ${request.path}`)
	logger.info(`  Body : ${request.body}\n`)

	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unkown endpoint" })
}

const errorHandler = (error, request, response, next) => {
	logger.error(`Error Handler Message : ${error.name}`)

	switch (error.name) {
		case "CastError":
			return response.status(400).send({ error: "malformatted id" })
		case "ValidationError":
			return response.status(400).json({ error: error.message })
		case "ServerError":
			return response.status(500).json({ error: error.message })
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
}
