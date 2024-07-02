CREATE OR REPLACE FUNCTION get_user_job_applications(input_user_id uuid)
RETURNS TABLE (
    job_id uuid,
    job_title text,
    company_name text,
    date_applied date,
    application_status text,
    link text,
    location text,
    employment_type text,
    salary int
)
LANGUAGE sql
AS $$
  SELECT 
    job_application.id AS job_id,  
    job_application.title as job_title, 
    job_application.company_name,
    job_application.date_applied, 
    job_application.application_status,
    job_application.link,
    job_application.location,
    job_application.employment_type,
    job_application.salary
  FROM 
    job_application
  WHERE
    job_application.user_id = input_user_id;
$$;
