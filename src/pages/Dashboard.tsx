import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AnnouncementsManager } from "@/components/admin/AnnouncementsManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { TrainingsManager } from "@/components/admin/TrainingsManager";
import { SiteSettingsManager } from "@/components/admin/SiteSettingsManager";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminTab = "announcements" | "services" | "trainings" | "settings";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("announcements");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUser(session.user);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const checkAdmin = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (data) setIsAdmin(true);
    };
    checkAdmin();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
      <SEO title="Dashboard - KATHECO CONSULTANCY" description="Admin dashboard" />
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b h-[65px] flex items-center px-4 gap-4">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">KATHECO Admin</h1>
          <span className="text-sm text-muted-foreground ml-auto hidden sm:block">{user.email}</span>
        </header>

        <div className="flex flex-1">
          {/* Sidebar - hidden on mobile unless toggled */}
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
            <AdminSidebar activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setSidebarOpen(false); }} onLogout={handleLogout} />
          </div>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">
            {activeTab === "announcements" && <AnnouncementsManager userId={user.id} isAdmin={isAdmin} />}
            {activeTab === "services" && <ServicesManager />}
            {activeTab === "trainings" && <TrainingsManager />}
            {activeTab === "settings" && <SiteSettingsManager />}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
