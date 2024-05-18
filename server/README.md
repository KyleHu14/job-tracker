# JobTracker - Backend

The backend of JobTracker is a REST API that uses Node.js. The structure of the API largely follows the format of Part 4 of the [Full Stack open](https://fullstackopen.com/en/) tutorial.

## Server Directory

1. diagrams : Holds images of ER Diagrams of the database
2. sql : Contains the SQL code used to generate tables of the Database
3. src : Source directory of the Node.js API

## Src Directory

src
├── controllers : Contains express routers
├── services : Initializes supabaseClient and supabase utility functions
├── tests : Test files that test each end point
├── utils
│ ├── config.js : Exports env variables
│ ├── logger.js : Debug logger used for printing information
│ ├── middleware.js : Middleware used in the API
│ └── supabaseErrorThrower.js : Error thrower used for supabase utilities
├── requests : REST Client requests used for testing
├── app.js : Creates the Express app and exports it
└── index.js : Initializes the app from app.js by having it listen on the port

## Design of the Database

![ER diagram of model](./diagrams/model-4-2024.jpeg)

The user_account and job_application tables follow a standard one to many relationship. Where a user can create multiple job applications to track.
