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
