const { createJobApps } = require("../services/jobapps")

const testUsers = [
	{ email_address: "test1@gmail.com", user_name: "test1" },
	{ email_address: "test2@gmail.com", user_name: "test2" },
]

const testJobApplications = [
	{
		user_id: "",
		title: "Software Engineering Intern 2024",
		company_name: "Amazon",
		date_applied: "2024-04-20",
		application_status: "pending",
	},
	{
		user_id: "",
		title: "Software Engineering Intern 2024",
		company_name: "Google",
		date_applied: "2024-04-22",
		application_status: "pending",
	},
	{
		user_id: "",
		title: "Software Engineering Intern 2024",
		company_name: "Netflix",
		date_applied: "2024-05-10",
		application_status: "rejected",
	},
	{
		user_id: "",
		title: "Web Developer",
		company_name: "UCI OIT",
		date_applied: "2023-08-23",
		application_status: "interview",
	},
	{
		user_id: "",
		title: "Full Stack Engineer",
		company_name: "Atlassian",
		date_applied: "2024-04-20",
		application_status: "rejected",
	},
]

const createJobAppsWithID = async (userId, jobApplications) => {
	for (let i = 0; i < jobApplications.length; i++) {
		// Assign userId to the user_id property of each job application
		jobApplications[i].user_id = userId
	}

	await createJobApps(jobApplications)
}

module.exports = {
	testUsers,
	testJobApplications,
	createJobAppsWithID,
}
