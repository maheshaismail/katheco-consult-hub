-- Drop the restrictive policy that requires authentication
DROP POLICY IF EXISTS "Authenticated users can view announcements" ON public.announcements;

-- Create a permissive policy allowing anyone to view announcements (for the public view)
CREATE POLICY "Anyone can view announcements" 
ON public.announcements 
FOR SELECT 
USING (true);

-- Grant select on the public view to anon role
GRANT SELECT ON public.announcements_public TO anon;
GRANT SELECT ON public.announcements_public TO authenticated;