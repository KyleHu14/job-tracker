import express from "express";
import supabaseClient from "../supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
	let { data, error } = await supabaseClient.from("user_account").select("*");

	if (error) {
		res.status(500).send({
			message: "An error occured with Supabase.",
		});
	} else {
		res.send(data);
	}
});

export default router;
