import express from "express";
import supabaseClient from "../../utils/supabase.js";

// Import service functions
import { getUsers, createUser } from "../../services/users.js";

const router = express.Router();

// [GET Route] : Returns all users
router.get("/", async (req, res) => {
	try {
		const data = await getUsers();
		res.send(data);
	} catch (error) {
		// Note : If the getUsers functions throws an error, we throw error code 500 since its a server side error
		res.status(500).send({
			message: error.message,
		});
	}
});

// [POST Route] : Creates a user based on the email & userName field
router.post("/:email/:userName", async (req, res) => {
	// Note : I initially wanted to validate parameters here, but since this isn't a public API and the paramters passed into here are from nextAuth so those parameters should be fine
	try {
		const newUser = await createUser(req.params.email, req.params.userName);
		res.send(newUser);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
});

export default router;
