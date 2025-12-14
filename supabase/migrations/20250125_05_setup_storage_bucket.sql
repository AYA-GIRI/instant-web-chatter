-- Migration: Setup Storage bucket for methods
-- Description: Create public bucket for storing method files

-- Create storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'methods',
  'methods',
  true,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for methods bucket
-- Anyone can read files (public bucket)
DROP POLICY IF EXISTS "Public can read methods files" ON storage.objects;
CREATE POLICY "Public can read methods files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'methods');

-- Only admins can upload files
DROP POLICY IF EXISTS "Admins can upload methods files" ON storage.objects;
CREATE POLICY "Admins can upload methods files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'methods' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update files
DROP POLICY IF EXISTS "Admins can update methods files" ON storage.objects;
CREATE POLICY "Admins can update methods files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'methods' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete files
DROP POLICY IF EXISTS "Admins can delete methods files" ON storage.objects;
CREATE POLICY "Admins can delete methods files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'methods' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

