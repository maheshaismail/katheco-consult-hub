import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Trash2, LogOut } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchAnnouncements();
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    
    if (!error && data) {
      setIsAdmin(true);
    }
  };

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    } else {
      setAnnouncements(data || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      let imageUrl = null;

      // Upload image if provided
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('announcements')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('announcements')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Insert announcement
      const { error: insertError } = await supabase
        .from("announcements")
        .insert({
          title,
          content,
          image_url: imageUrl,
          user_id: user.id,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Announcement created successfully.",
      });

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      const fileInput = document.getElementById("image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      // Refresh announcements
      fetchAnnouncements();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
      fetchAnnouncements();
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to delete ALL announcements? This cannot be undone.")) return;
    
    setLoading(true);
    
    const { error } = await supabase
      .from("announcements")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

    if (error) {
      toast({
        title: "Error",
        description: "Failed to clear announcements: " + error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "All announcements cleared successfully",
      });
      fetchAnnouncements();
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Dashboard - KATHECO CONSULTANCY"
        description="Manage announcements for KATHECO website"
      />
      
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Announcement Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Announcement title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      placeholder="Announcement details"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image (optional)</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating..." : "Create Announcement"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Announcements List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Announcements</h2>
                {isAdmin && announcements.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleClearAll}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardContent className="pt-6">
                    {announcement.image_url && (
                      <img
                        src={announcement.image_url}
                        alt={announcement.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                    <p className="text-muted-foreground mb-4">{announcement.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(announcement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {announcements.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No announcements yet. Create your first one!
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
