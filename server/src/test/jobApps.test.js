const { test, after, beforeEach, describe } = require("node:test")
const supertest = require("supertest")
const assert = require("assert")

const config = require("../utils/config")

const {
	deleteAllUsers,
	createUsers,
	getUsers,
} = require("../services/supabase/users")
const { deleteAllJobApps } = require("../services/supabase/jobapps")
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

	// Test 2 : The testdb should have a total of 5 job applications
	test("job_applications should only have 5 records", async () => {
		const response = await api.get("/api/jobapps")

		assert.strictEqual(response.body.length, testJobApplications.length)
	})

	// Test 3 : Verifies that the job applications have been created correctly
	test("Verifying that specific job apps have been created", async () => {
		const response = await api.get("/api/jobapps")

		const companyNames = response.body.map((r) => r.company_name)
		const titles = response.body.map((r) => r.job_title)

		// Checking company_names
		assert(companyNames.includes("Amazon"))
		assert(companyNames.includes("Google"))
		assert(companyNames.includes("UCI OIT"))

		// Checking Titles
		assert(titles.includes("Software Engineering Intern 2024"))
		assert(titles.includes("Web Developer"))
		assert(titles.includes("Full Stack Engineer"))
	})

	// Test 4 : Validating behavior of the /:userId route
	test("The /:userId route should return the correct number of records associated with the userId", async () => {
		// First get the users that exist in the db
		const userResponse = await api.get("/api/users")

		// Next grab the user's job applications
		const userJobAppResponse = await api.get(
			`/api/jobapps/${userResponse.body[0].id}`
		)

		assert.strictEqual(userJobAppResponse.body.length, 3)
	})
})

// Group 1 : These tests assume that there are some users & job applications in the test db
describe.only("Group 2 : No job apps exist in db", () => {
	// 1. Before starting our tests, clear entire db and re populate
	beforeEach(async () => {
		// 1. First delete all job applications
		await deleteAllJobApps()

		// 2. Then we delete all users
		await deleteAllUsers()

		// 3. Now that we have a clear db, add some users first
		await createUsers(testUsers)
	})

	test.only("Validate creating a new record with a correct id_token", async () => {
		const users = await getUsers()
		const firstUserId = users[0].id

		const newJobApp = {
			user_id: firstUserId,
			title: "Associate Developer",
			date_applied: "2023-04-11",
			application_status: "pending",
			company_name: "Fitbit",
		}

		const postResponse = await api
			.post("/api/jobapps")
			.send(newJobApp)
			.set("Authorization", `Bearer ${config.ID_TOKEN}`)
			.expect(201)
			.expect("Content-Type", /application\/json/)
	})
})

// after(async () => {})
