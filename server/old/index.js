import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./api/routes/users.js";

const app = express();
const PORT = 5000;

// Using JSON data for our application
app.use(bodyParser.json());

app.use("/users", usersRoutes);

// Base Route
app.get("/", (req, res) => {
	res.send("Welcome to the Job Tracker API.");
});

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
