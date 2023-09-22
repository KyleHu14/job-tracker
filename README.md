## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the web app.

## Icon Attribution
1. Problem icons created by Freepik - Flaticon, https://www.flaticon.com/free-icons/problem


# Documentation
## Introduction

Job tracker is a web application that allows users to keep track of their job hunting process. Upon logging in, users can add their job applications which is displayed in a list format. 

## Project Structure

The project is comprised of : NextJS as the frontend and Supabase as the backend. NextAuth is used for authentication.

## File Structure

The supabase folder contains a file called supabase.js. Within the supabase file are asynchronous functions that mainly create, update, delete, and perform other operations on the database.  

All CSS files are located in the styles folder. CSS files for components are located in styles/components whereas CSS files for pages are located in styles/pages. 

## Database Structure