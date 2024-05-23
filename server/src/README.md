# src

The src directory holds all files of the Express API. This README will outline the structure and other information about the API. The structure of this directory largely follows the format showcased in the [Full Stack open](https://fullstackopen.com/en/) tutorial.

## Directory

1. controllers

    - Controllers contains all the Express routers. Each file represents a route and its relevant sub routes.
    - For example, users.js would contain the get, post, or put requests relevant to the users table.

2. requests
    - I use the VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to test making requests.
    - The requests folder contains REST Client files that are used to test the functionality of the routes.
3. services
    - [services/supabase/supabase.js](https://github.com/KyleHu14/job-tracker/blob/main/server/src/services/supabase/supabase.js) initializes the supabaseClient that is used to query the PostgreSQL database in Supabase.
    - The rest of the files export functions that are used by the controllers to interact with the database.
4. tests
    - Tests contains all test files used to test each endpoint.
5. utils

    - Config.js exports env variables such as the database urls and the port.
    - Logger.js exports a simple debugging logger used for printing information.
    - Middleware.js exports various middleware used in the express app.
    - SupabaseErrorThrower.js exports a function that throws a server error.

6. app.js
    - Creates the Express app and exports it to be used in index.js.
7. index.js
    - Initializes the app from app.js by having it listen to the port.

## Testing

This project uses Node.js's testing module, cross env, and the supertest package. Tests are performed in a separate testing database.

To run tests, use the following commands :

1. Test a single file : npm test -- tests/userRouteTest.js
2. Run any tests that have this name : npm test -- --test-name-pattern="users_are_returned_as_json"
3. Run any tests that contain the string "users" : npm run test -- --test-name-pattern="users"
