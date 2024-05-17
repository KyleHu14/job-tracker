const { test, after, beforeEach } = require("node:test")
const supertest = require("supertest")
const app = require("../app")
const { deleteAllUsers, createUsers } = require("../services/users")

var assert = require("assert")
const api = supertest(app)

const testUsers = [
	{ email_address: "test1@gmail.com", user_name: "test1" },
	{ email_address: "test2@gmail.com", user_name: "test2" },
]

beforeEach(async () => {
	await deleteAllUsers()
	await createUsers(testUsers)
})

test("Users are returned as JSON", async () => {
	await api
		.get("/api/users")
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("There are two users", async () => {
	const response = await api.get("/api/users")

	assert.strictEqual(response.body.length, testUsers.length)
})

test("Validating first user's credentials", async () => {
	const response = await api.get("/api/users")

	const firstUser = response.body[0]

	assert.strictEqual(firstUser.email_address, "test1@gmail.com")
	assert.strictEqual(firstUser.user_name, "test1")
})

// after(async () => {})
