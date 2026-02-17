-- Create invitations table
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  is_published BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create Policy: Users can only see their own invitations
CREATE POLICY "Users can view own invitations" 
ON invitations FOR SELECT 
USING (auth.uid() = user_id);

-- Create Policy: Users can insert their own invitations
CREATE POLICY "Users can insert own invitations" 
ON invitations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create Policy: Users can update their own invitations
CREATE POLICY "Users can update own invitations" 
ON invitations FOR UPDATE 
USING (auth.uid() = user_id);

-- Create Policy: Users can delete their own invitations
CREATE POLICY "Users can delete own invitations" 
ON invitations FOR DELETE 
USING (auth.uid() = user_id);

-- Create Policy: Public can view published invitations (for the actual invitation page later)
CREATE POLICY "Public can view published invitations" 
ON invitations FOR SELECT 
USING (is_published = true);
