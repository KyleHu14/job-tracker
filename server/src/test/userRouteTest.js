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

test("users_are_returned_as_json", async () => {
	await api
		.get("/api/users")
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("there_are_two_users", async () => {
	const response = await api.get("/api/users")

	assert.strictEqual(response.body.length, testUsers.length)
})

test("validate_first_user_credentials", async () => {
	const response = await api.get("/api/users")

	const firstUser = response.body[0]

	assert.strictEqual(firstUser.email_address, "test1@gmail.com")
	assert.strictEqual(firstUser.user_name, "test1")
})

test("validate_creating_a_user", async () => {
	const newUser = { email_address: "test3@gmail.com", user_name: "test3" }

	// prettier-ignore
	const postResponse = await api
		.post("/api/users")
		.send([newUser])
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(postResponse.body.user_name, "test3")
	assert.strictEqual(postResponse.body.email_address, "test3@gmail.com")

	const getResponse = await api.get("/api/users")

	assert.strictEqual(getResponse.body.length, testUsers.length + 1)
})

test("user_with_null_fields_is_not_created", async () => {
	const newUser = {
		email_address: "11@gmail.com",
	}

	// prettier-ignore
	const postResponse = await api
		.post("/api/users")
		.send([newUser])
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const getResponse = await api.get("/api/users")

	assert.strictEqual(getResponse.body.length, testUsers.length)
})

// after(async () => {})
