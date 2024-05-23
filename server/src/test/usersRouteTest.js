const { test, after, beforeEach, describe } = require("node:test")
const supertest = require("supertest")
const assert = require("assert")

const { deleteAllUsers, createUsers, getUsers } = require("../services/users")
const { testUsers } = require("./testUtils")

const app = require("../app")
const api = supertest(app)

// Group 1 : These tests assume that there are some users in the test db
describe("Group 1 : Some users exist in database", () => {
	// 1. Before starting our tests, first delete all users in test db and create new ones
	beforeEach(async () => {
		await deleteAllUsers()
		await createUsers(testUsers)
	})

	// Test 1 : Verifies if GET req to the users route returns a JSON file
	test("users are returned in json format", async () => {
		await api
			.get("/api/users")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	// Test 2 : The test db should only have 2 users after the beforeEach
	test("verify test database only has 2 users", async () => {
		const response = await api.get("/api/users")

		assert.strictEqual(response.body.length, testUsers.length)
	})

	// Test 3 : Verifies that the users have been created properly after beforeEach
	test("verify that the testdb has been populated correctly", async () => {
		const response = await api.get("/api/users")

		const firstUser = response.body[0]

		assert.strictEqual(firstUser.email_address, "test1@gmail.com")
		assert.strictEqual(firstUser.user_name, "test1")
	})

	// Test Group 4 : Group of tests that verify functionality of fetching a specific user
	describe("Viewing a specific user", () => {
		// 1. Viewing a specific user that exists in db
		test("Can view a specific user with an email", async () => {
			const response = await api.get("/api/users/test1@gmail.com")

			const responseUser = response.body[0]

			assert.strictEqual(responseUser.email_address, "test1@gmail.com")
			assert.strictEqual(responseUser.user_name, "test1")
		})

		// 2. Gives a 404 if user doesn't exist in db
		test("Fails with 404 status code if user doesn't exist", async () => {
			await api.get("/api/users/notexist@gmail.com").expect(404)
		})
	})
})

// Group 2 : These tests don't assume that the testing db has been populated
describe("Creation of a user", () => {
	// Test 1 : Validates that a user can be created correctly
	test("Validate creating a new user", async () => {
		const newUser = {
			email_address: "test3@gmail.com",
			user_name: "test3",
		}

		// prettier-ignore
		const postResponse = await api
				.post("/api/users")
				.send([newUser])
				.expect(201)
				.expect('Content-Type', /application\/json/)

		assert.strictEqual(postResponse.body.user_name, "test3")
		assert.strictEqual(postResponse.body.email_address, "test3@gmail.com")

		const usersAtEnd = await getUsers()

		assert.strictEqual(usersAtEnd.length, testUsers.length + 1)
	})

	// Test 2 : Validates that a user with a null field cannot be created
	test("User with a null field cannot be created", async () => {
		const newUser = {
			email_address: "11@gmail.com",
		}

		// prettier-ignore
		const postResponse = await api
			.post("/api/users")
			.send([newUser])
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await getUsers()

		assert.strictEqual(usersAtEnd.length, testUsers.length)
	})

	// Test 3 : Validates that a user with an empty field cannot be created
	test("User with a empty field cannot be created", async () => {
		const newUser = {
			email_address: "11@gmail.com",
			user_name: "",
		}

		// prettier-ignore
		const postResponse = await api
			.post("/api/users")
			.send([newUser])
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await getUsers()

		assert.strictEqual(usersAtEnd.length, testUsers.length)
	})
})

// after(async () => {})
