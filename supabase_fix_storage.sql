-- 1. Create the 'logos' bucket if it doesn't already exist
-- We use ON CONFLICT to make it safe to run multiple times
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow Public Access (SELECT)
-- This allows anyone to view the images in the 'logos' bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'logos' );

-- 3. Allow Public Uploads (INSERT)
-- This allows uploads to the 'logos' bucket
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
CREATE POLICY "Public Uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'logos' );
