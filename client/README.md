# :computer: JobTracker - Frontend

The frontend of the website is built with [Next.js](https://nextjs.org/) with frontend libraries [shadcn](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/).

## :open_file_folder: Server Directory

The directory follows the standard src directory thats offered by Next.js. The only thing that should be noted is the auth.ts file in the src folder. The authentication configurations for Authjs are stored in this file.

## :lock: Frontend Authentication Flow

Note : This section will only describe the frontend authentication flow. The full authentication flow is described [here](https://github.com/KyleHu14/job-tracker/blob/main/README.md).

### Auth Flow

1. A user signs into the app using the Google OAuth provider.
2. Nextauth by itself does not expose many parameters, I had to adjust the configurations so that it adds the id_token parameter which is what Google Oauth uses to validate a user.
    - Within auth.ts, I added the jwt and session callbacks
    - The jwt callback adds the id_token parameter to the token
    - The token callback attacked the id_token parameter of the token to the session
    - This way, the session can persist the id_token field
3. Now that the session has the id_token parameter, we can make requests to the backend which will validate the id_token assigned by Google

## :test_tube: Testing

Unit testing of the frontend is done with :tulip: [Vitest](https://vitest.dev/).

### Running Tests

To run tests, run the command npm run test.

### File Location

Tests are located in [/src/**tests**](https://github.com/KyleHu14/job-tracker/tree/main/client/src/__tests__)
