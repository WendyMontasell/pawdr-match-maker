-- Add a long_description column to the Pets table for detailed pet information
ALTER TABLE public."Pets" 
ADD COLUMN long_description TEXT;