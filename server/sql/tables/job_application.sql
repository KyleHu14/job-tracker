CREATE TABLE
  public.job_application (
    id uuid default gen_random_uuid(),
    user_id uuid not null references public.user_account,
    title text,
    company_name text,
    date_applied date,
    application_status text,
    primary key(id)
)