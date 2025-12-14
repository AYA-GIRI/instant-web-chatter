-- Migration: Create methods table
-- Description: Store educational materials (methodics) metadata with file references

-- Create methods table
CREATE TABLE IF NOT EXISTS methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  direction TEXT NOT NULL CHECK (direction IN ('ai', 'ml', 'neural', 'prompting')),
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  icon_name TEXT NOT NULL,
  format TEXT DEFAULT 'pdf',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_methods_level ON methods(level);
CREATE INDEX IF NOT EXISTS idx_methods_direction ON methods(direction);
CREATE INDEX IF NOT EXISTS idx_methods_is_active ON methods(is_active);
CREATE INDEX IF NOT EXISTS idx_methods_format ON methods(format);

-- Enable RLS
ALTER TABLE methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Everyone can view active methods
DROP POLICY IF EXISTS "Anyone can view active methods" ON methods;
CREATE POLICY "Anyone can view active methods"
  ON methods FOR SELECT
  USING (is_active = true);

-- Only admins can insert methods
DROP POLICY IF EXISTS "Admins can insert methods" ON methods;
CREATE POLICY "Admins can insert methods"
  ON methods FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update methods
DROP POLICY IF EXISTS "Admins can update methods" ON methods;
CREATE POLICY "Admins can update methods"
  ON methods FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete methods
DROP POLICY IF EXISTS "Admins can delete methods" ON methods;
CREATE POLICY "Admins can delete methods"
  ON methods FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_methods_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS on_methods_updated ON methods;
CREATE TRIGGER on_methods_updated
  BEFORE UPDATE ON methods
  FOR EACH ROW EXECUTE FUNCTION public.handle_methods_updated_at();

