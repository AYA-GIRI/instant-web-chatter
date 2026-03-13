-- Migration: Add specialty_role to profiles
-- Description: Separate professional specialty role from access-control role

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS specialty_role TEXT
CHECK (specialty_role IN ('developer', 'analyst', 'marketer', 'designer', 'tester'));

