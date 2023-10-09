import { createClient } from '@supabase/supabase-js'

/* 
    INITIALIZE CLIENT
    In this step, we will first initialize the supabase client
    Initialize the keys from the env file
*/ 
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabase_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Throw errors if we are missing an env variable
if (supabase_url === ''){
    throw new Error("ENV ERROR : Supabase URL is null, check if the .env file is initialized correctly.")
}
if (supabase_anon_key === ''){
    throw new Error("ENV ERROR : Supabase Anon key is null, check if the .env file is initialized correctly.")
}

// Create the supabase client
const supabase = createClient(
    supabase_url,
    supabase_anon_key
)

// SUPABASE FUNCTIONS

/* 
    [Fetching]
    Fetches all applications in the database
*/
export const fetchApps = async (email) => {
    // 1. Make a call to supabase
    let { data: job_apps, error } = await supabase
        .from('job_apps')
        .select('*')
        /* 
            - We use email as an identifier since we are fetching ALL job apps that are pertaining to a user
            - Every job app has an email field that serves as an identifier
        */ 
        .eq('user_email', email)

    // 2. If there is an error, return null because users may have just created their account and therefore have no applications
    if (error) {
        return null
    }

    return job_apps
}

// Fetch the statistics(total_apps, rejected_apps, pending_apps, accepted_apps) of a user
export const fetchStats = async (email) => {
    // 1. Make a call to supabase
    let { data: userStats, error } = await supabase
        .from('users')
        // Selects either 0 or 1 rows
        .select()
        .eq('email', email)

    // 2. If there is an error, we can return an empty array
    //    We can return an empty array in this case since the array should always be populated
    if (error) {
        return []
    }

    return userStats
}

/* 
    [Creating]
    Creates a new row in the job_apps table
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
    // 1. Make a call to supabase
    const { newApp, newAppError } = await supabase
    .from('job_apps')
    .insert([
        { 
            title: newAppData.jobTitle,
            company_name : newAppData.company,
            location: newAppData.location,
            status: newAppData.status,
            date: newAppData.startDate,
            user_email: newAppData.email,
            link: newAppData.link
        },
    ])

    /*  
        This makes use of supabase functions, its pretty cool
        Learned it through this link : https://github.com/orgs/supabase/discussions/909
        We increment the total apps in the case we create a new app
    */

    /* 
        2. Update the relevant user table
        Increment the user's total apps counter & their status counter  
        We do this by calling functions that are defined in Postgres
    */ 
    const { incrementRes, incrementError } = await supabase 
        .rpc('increment_total_apps', {useremail : newAppData.email})

    const { incrementStatusRes, incrementStatusError } = await supabase 
        .rpc(`increment_${newAppData.status}_apps`, {useremail : newAppData.email})


    // Detect if there are any errors
    if (newAppError) {
        console.error(`Error creating application`, error)
        return error
    }
}

/* 
    Creates a new row in the users table
    newAppData is an object that has the following format : 
    {
        email: (user's email),
		total_apps : 0,
		rejected_apps : 0,
		pending_apps : 0,
		accepted_apps : 0,
    }
*/
export const createUserInfo = async (email) => {
    // 1. We need to first check if there exists a record in the users table
    //    Each user can only have 1 record, since each user should only have 1 set of stats
    let { data: users, error } = await supabase
        .from('users')
        .select("*")
        .eq('email', email)

    // 2. Error Check
    if (error) {
        return false
    }

    // 3. If there exists no row that contains the current user, then create a new record
    if(users.length == 0){
        const { data, error } = await supabase
        .from('users')
        .insert([
            { email: email, total_apps: 0, rejected_apps: 0, pending_apps: 0, accepted_apps: 0 },
        ]).select()
    }

    // 4. If all goes well, return true
    return true
}

// [Deleting]
// Deletes a record from the job_apps table
export const delApp = async (appId, email, status) => {
    // 1. First delete the row from the job_apps table by matching the ID
    const { error } = await supabase
        .from('job_apps')
        .delete()
        .eq('id', appId)

    // 2.  We decrement the total apps since we have just removed a row from job_apps
    const { decrementRes, decrementError } = await supabase 
        .rpc('decrement_total_apps', {useremail : email})

    // 3. Also decrement the respective status counter, if we just deleted a pending job_app we also delete the respective counter
    const { decrementStatusRes, decrementStatusError } = await supabase 
        .rpc(`decrement_${status}_apps`, {useremail : email})

    // 4. If there is an error, return an error
    if (error) {
        console.error(`Error deleting application`, error)
        return error
    } 
    // Else true is only here in case I want to verify it was a successful operation
    // else {
    //     return true
    // }
}

// [Updating]
// Updates the details of a job app in the job_apps table
export const updateApp = async (appId, newTitle, newCompanyName, newLoc, newStatus, newDate, link) => {
    // 1. Updates the matching row in job_apps by matching it with the id
    const { data, error } = await supabase
        .from('job_apps')
        .update({ title: newTitle, company_name: newCompanyName, location: newLoc, status: newStatus, date: newDate, link: link })
        .eq('id', appId)
        .select()

    // 2. Return false in the case of an error
    if (error) {
        return false
    }
}