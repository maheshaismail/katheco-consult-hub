-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for announcements
-- Everyone can view announcements
CREATE POLICY "Anyone can view announcements"
ON public.announcements
FOR SELECT
USING (true);

-- Only authenticated users can create announcements
CREATE POLICY "Authenticated users can create announcements"
ON public.announcements
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own announcements
CREATE POLICY "Users can update own announcements"
ON public.announcements
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own announcements
CREATE POLICY "Users can delete own announcements"
ON public.announcements
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for announcement images
INSERT INTO storage.buckets (id, name, public)
VALUES ('announcements', 'announcements', true);

-- Create storage policies for announcement images
CREATE POLICY "Announcement images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'announcements');

CREATE POLICY "Authenticated users can upload announcement images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'announcements' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own announcement images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'announcements' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own announcement images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'announcements' AND auth.uid() IS NOT NULL);