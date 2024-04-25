CREATE TABLE
  public.user_account (
    id uuid default gen_random_uuid(),
    email_address text,
    user_name text,
    primary key(id)
  )