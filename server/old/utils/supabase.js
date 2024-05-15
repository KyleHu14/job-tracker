import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// 1. Check if environment variables are null / uninitialized
if (process.env.SUPABASE_URL == null) {
	throw new Error(
		"ENV ERROR : Supabase URL is null, check if the .env file is initialized correctly."
	);
}

if (process.env.SUPABASE_PUBLIC_KEY == null) {
	throw new Error(
		"ENV ERROR : Supabase URL is null, check if the .env file is initialized correctly."
	);
}

// 2. Both URLS are not null, we can create and export the supabase client
const supabaseClient = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_PUBLIC_KEY
);

export default supabaseClient;
