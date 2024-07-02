CREATE OR REPLACE FUNCTION get_job_applications()
RETURNS TABLE (
    job_id uuid,
    job_title text,
    company_name text,
    date_applied date,
    application_status text,
    user_id uuid,
    email_address text,
    user_name text
)
LANGUAGE sql
AS $$
  SELECT 
    job_application.id AS job_id,  
    job_application.title as job_title, 
    job_application.company_name,
    job_application.date_applied, 
    job_application.application_status,
    job_application.user_id,
    user_account.email_address, 
    user_account.user_name
  FROM 
    job_application
  INNER JOIN 
    user_account ON job_application.user_id = user_account.id;
$$;
