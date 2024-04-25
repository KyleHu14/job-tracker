-- 1. Insert test users into the db
INSERT INTO public.user_account(email_address, user_name)
VALUES
  ('test@gmail.com', 'test1'),
  ('test@gmail.com', 'test2')

-- 2. Insert job applications for test1 user
INSERT INTO public.job_application(user_id, title, date_applied, application_status)
VALUES
  ('6dc83955-6272-4088-9ef7-6d9e974bf722', 'Amazon Dishwasher', '2024-04-25', 'rejected'),
  ('6dc83955-6272-4088-9ef7-6d9e974bf722', 'Amazon Burger Flipper', '2024-01-05', 'pending'),
  ('6dc83955-6272-4088-9ef7-6d9e974bf722', 'Mc Donalds Drivethrough Operator', '2024-03-19', 'interview'),
  ('6dc83955-6272-4088-9ef7-6d9e974bf722', 'Albertsons Cashier Technical Operator', '2020-01-25', 'rejected');

-- 3. Insert job applications for test2 user
INSERT INTO public.job_application(user_id, title, date_applied, application_status)
VALUES
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Amazon Intern', '2024-04-25', 'rejected'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Amazon SE Intern', '2024-03-20', 'rejected'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Albertsons Clerk', '2024-02-15', 'pending'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Google SE', '2024-01-25', 'interview'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Job 2', '2023-12-22', 'ghosted'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Job 3', '2023-12-19', 'ghosted'),
  ('3672179f-a588-4bbd-ba56-9e63869ada44', 'Job 4', '2023-12-15', 'ghosted');
