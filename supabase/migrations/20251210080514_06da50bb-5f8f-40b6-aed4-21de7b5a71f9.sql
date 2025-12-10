-- Create a public view that excludes user_id
CREATE VIEW public.announcements_public AS
SELECT id, title, content, image_url, created_at, updated_at
FROM public.announcements;

-- Grant access to the view for anonymous users
GRANT SELECT ON public.announcements_public TO anon;
GRANT SELECT ON public.announcements_public TO authenticated;

-- Update the SELECT policy on announcements to only allow authenticated users
DROP POLICY IF EXISTS "Anyone can view announcements" ON public.announcements;

CREATE POLICY "Authenticated users can view announcements"
ON public.announcements
FOR SELECT
TO authenticated
USING (true);