-- Add user_id column to adopter_response table for future authentication
ALTER TABLE public.adopter_response 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Enable Row Level Security
ALTER TABLE public.adopter_response ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous users (temporary until authentication is implemented)
CREATE POLICY "Allow anonymous inserts for adopter_response" 
ON public.adopter_response 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anonymous selects for adopter_response" 
ON public.adopter_response 
FOR SELECT 
USING (true);

-- Also ensure Pets table is accessible for reading (note: correct case)
ALTER TABLE public."Pets" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous reads for pets" 
ON public."Pets" 
FOR SELECT 
USING (true);