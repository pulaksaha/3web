-- Run this in your Supabase SQL Editor to add the missing columns

ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS body_type text,
ADD COLUMN IF NOT EXISTS scenario text,
ADD COLUMN IF NOT EXISTS ethnicity text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS views integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS duration text;

-- Optional: Create an index for faster filtering if you have many videos
CREATE INDEX IF NOT EXISTS idx_videos_filters ON videos(category, body_type, scenario, ethnicity);
