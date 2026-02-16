-- 1. Create the logos bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

-- 2. Enable RLS (Should be enabled by default, but ensuring it)
alter table storage.objects enable row level security;

-- 3. Drop existing policies to handle re-runs gracefully
drop policy if exists "Allow public uploads" on storage.objects;
drop policy if exists "Allow public viewing" on storage.objects;

-- 4. Create upload policy (Allows anyone to upload to 'logos' bucket)
create policy "Allow public uploads"
on storage.objects for insert
with check ( bucket_id = 'logos' );

-- 5. Create viewing policy (Allows anyone to view files in 'logos' bucket)
create policy "Allow public viewing"
on storage.objects for select
using ( bucket_id = 'logos' );
