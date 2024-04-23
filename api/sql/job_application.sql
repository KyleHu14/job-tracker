CREATE TABLE
  public.job_application (
    id uuid not null primary key,
    user_id uuid not null references public.user_account,
    title text,
    date_applied date,
    application_status text
)