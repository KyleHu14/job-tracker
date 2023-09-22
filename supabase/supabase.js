import { createClient } from '@supabase/supabase-js'

// Initialize the keys from the env file
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabase_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Throw errors if we are missing an env variable
if (supabase_url === ''){
    throw new Error("ENV ERROR : Supabase URL is null, check if the .env file is initialized correctly.")
}
if (supabase_anon_key === ''){
    throw new Error("ENV ERROR : Supabase Anon key is null, check if the .env file is initialized correctly.")
}

// Create the supabase client, this will be used in creating our lib functions below
const supabase = createClient(
    supabase_url,
    supabase_anon_key
)

// [Supabase Functions]

// [Fetching]
// Fetches all applications in the database
export const fetchApps = async (email) => {
    let { data: job_apps, error } = await supabase
    .from('job_apps')
    .select('*')
    .eq('user_email', email)

    if(error){
        return null
    }

    // Debugging 
    // return []
    return job_apps
}

// Fetch the statistics(total_apps, rejected_apps, pending_apps, accepted_apps) of a user
export const fetchStats = async (email) => {
    let { data: userStats, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)

    return userStats
}

// [Creating]
/* 
    Creates a new application in supabase
    newAppData is an object that has the following format : 
    {
        status: "",
		startDate: "",
		jobTitle: "",
		location: "",
		company: "",
        email: session.user.email
    }
*/
export const createApp = async (newAppData) => {
    // Create an app through supabase
    const { newApp, newAppError } = await supabase
    .from('job_apps')
    .insert([
        { 
            title: newAppData.jobTitle,
            company_name : newAppData.company,
            location: newAppData.location,
            status: newAppData.status,
            date: newAppData.startDate,
            user_email: newAppData.email
        },
    ])

    // This makes use of supabase functions, its pretty cool
    // Learned it through this link : https://github.com/orgs/supabase/discussions/909
    const { incrementRes, incrementError } = await supabase 
        .rpc('increment_total_apps', {useremail : newAppData.email})


    // Detect if there are any errors
    if (newAppError) {
        console.error(`Error creating application`, error)
        return error
    }
}

export const createUserInfo = async (email) => {
    let { data: users, error } = await supabase
        .from('users')
        .select("*")
        .eq('email', email)

    // If there exists no row that contains the current user, then create a new record
    if(users.length == 0){
        const { data, error } = await supabase
        .from('users')
        .insert([
            { email: email, total_apps: 0, rejected_apps: 0, pending_apps: 0, accepted_apps: 0 },
        ]).select()
    }

    return true
}

// [Deleting]
export const delApp = async (appId) => {
    // Delete the task
    const { error } = await supabase
    .from('job_apps')
    .delete()
    .eq('id', appId)

    // If there is an error, throw an error
    if (error) {
        console.error(`Error deleting application`, error)
        return error
    } 
    // Else true is only here in case I want to verify it was a successful operation
    // else {
    //     return true
    // }
}