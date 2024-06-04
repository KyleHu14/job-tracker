create or replace function insert_user_if_exists(input_email text, input_user_id text)
returns void
language sql
as $$
    INSERT INTO public.user_account (email_address, user_name)
    VALUES (input_email, input_user_id)
    ON CONFLICT (email_address) DO NOTHING;
$$
