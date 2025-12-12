-- Drop the overly permissive policy on the base table
DROP POLICY IF EXISTS "Anyone can view announcements" ON public.announcements;

-- Create a policy that only allows authenticated users to view the base table
CREATE POLICY "Authenticated users can view announcements" 
ON public.announcements 
FOR SELECT 
TO authenticated
USING (true);

-- Recreate the public view with SECURITY DEFINER to bypass RLS
DROP VIEW IF EXISTS public.announcements_public;

CREATE VIEW public.announcements_public 
WITH (security_invoker = false)
AS
SELECT 
  id,
  title,
  content,
  image_url,
  created_at,
  updated_at
FROM public.announcements;

-- Grant access to the view for anonymous users
GRANT SELECT ON public.announcements_public TO anon;
GRANT SELECT ON public.announcements_public TO authenticated;