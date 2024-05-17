// [Imports]
// 1. Express Application
const app = require("./app")

// 2. Env Variables
const config = require("./utils/config")

// 3. Logger for logging errors / info
const logger = require("./utils/logger")

// [Initializing] - Init the app and listen to the port
app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
