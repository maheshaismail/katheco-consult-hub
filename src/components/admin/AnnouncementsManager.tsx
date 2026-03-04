import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

interface Props {
  userId: string;
  isAdmin: boolean;
}

export const AnnouncementsManager = ({ userId, isAdmin }: Props) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setAnnouncements(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("announcements").upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("announcements").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
      const { error } = await supabase.from("announcements").insert({ title, content, image_url: imageUrl, user_id: userId });
      if (error) throw error;
      toast({ title: "Success!", description: "Announcement created." });
      setTitle("");
      setContent("");
      setImage(null);
      fetchAnnouncements();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Announcement removed." });
      fetchAnnouncements();
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Delete ALL announcements? This cannot be undone.")) return;
    setLoading(true);
    const { error } = await supabase.from("announcements").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cleared", description: "All announcements removed." });
      fetchAnnouncements();
    }
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ann-title">Title</Label>
              <Input id="ann-title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Announcement title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-content">Content</Label>
              <Textarea id="ann-content" value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Announcement details" rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-image">Image (optional)</Label>
              <Input id="ann-image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Announcement"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Announcements</h2>
          {isAdmin && announcements.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClearAll} disabled={loading}>
              <Trash2 className="h-4 w-4 mr-2" /> Clear All
            </Button>
          )}
        </div>
        {announcements.map((a) => (
          <Card key={a.id}>
            <CardContent className="pt-6">
              {a.image_url && <img src={a.image_url} alt={a.title} className="w-full h-48 object-cover rounded-md mb-4" />}
              <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-muted-foreground mb-4">{a.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(a.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {announcements.length === 0 && <p className="text-muted-foreground text-center py-8">No announcements yet.</p>}
      </div>
    </div>
  );
};
