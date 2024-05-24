const { test, after, beforeEach, describe } = require("node:test")
const supertest = require("supertest")
const assert = require("assert")

const { deleteAllUsers, createUsers } = require("../services/users")
const { deleteAllJobApps } = require("../services/jobapps")
const {
	testUsers,
	testJobApplications,
	createJobAppsWithID,
} = require("./utils")

const app = require("../app")
const api = supertest(app)

// Group 1 : These tests assume that there are some users & job applications in the test db
describe("Group 1 : Some users and job applications exist in database", () => {
	// 1. Before starting our tests, clear entire db and re populate
	beforeEach(async () => {
		// 1. First delete all job applications
		await deleteAllJobApps()

		// 2. Then we delete all users
		await deleteAllUsers()

		// 3. Now that we have a clear db, add some users first
		const testUserData = await createUsers(testUsers)

		// 4. Create 3 job applications associated with the first user
		await createJobAppsWithID(
			testUserData[0].id,
			testJobApplications.slice(0, 3)
		)

		// 5. Create 2 job applications associated with the 2nd user
		await createJobAppsWithID(
			testUserData[1].id,
			testJobApplications.slice(testJobApplications.length - 2)
		)
	})

	// Test 1 : Verifies if GET req to the users route returns a JSON file
	test("Job applications are returned in JSON format", async () => {
		await api
			.get("/api/jobapps")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})
})
// after(async () => {})
