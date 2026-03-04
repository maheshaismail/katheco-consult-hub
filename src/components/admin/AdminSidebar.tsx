import { Megaphone, Briefcase, GraduationCap, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminTab = "announcements" | "services" | "trainings" | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
}

const tabs = [
  { id: "announcements" as const, label: "Announcements", icon: Megaphone },
  { id: "services" as const, label: "Services", icon: Briefcase },
  { id: "trainings" as const, label: "Trainings", icon: GraduationCap },
  { id: "settings" as const, label: "Site Settings", icon: Settings },
];

export const AdminSidebar = ({ activeTab, onTabChange, onLogout }: AdminSidebarProps) => {
  return (
    <aside className="w-64 min-h-[calc(100vh-65px)] border-r bg-muted/30 flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" size="sm" className="w-full" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
