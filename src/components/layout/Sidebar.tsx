
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Settings, 
  Book,
  Search
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 mb-1 font-medium text-sidebar-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
        )}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar pt-4 border-r border-sidebar-border">
      <div className="px-3 py-2">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 px-2">
          <div className="h-8 w-8 rounded bg-cyber-accent flex items-center justify-center">
            <span className="text-white font-bold">CG</span>
          </div>
          <span>Cyber Guardian</span>
        </h2>
        
        <nav className="space-y-1 mt-8">
          <SidebarItem 
            icon={<Home className="h-5 w-5" />} 
            label="Home" 
            href="/" 
            isActive={isActivePath("/")} 
          />
          <SidebarItem 
            icon={<AlertTriangle className="h-5 w-5" />} 
            label="Alerts" 
            href="/alerts" 
            isActive={isActivePath("/alerts")} 
          />
          <SidebarItem 
            icon={<Search className="h-5 w-5" />} 
            label="Investigations" 
            href="/investigations" 
            isActive={isActivePath("/investigations")} 
          />
          <SidebarItem 
            icon={<Activity className="h-5 w-5" />} 
            label="Attack Simulation" 
            href="/attack-simulation" 
            isActive={isActivePath("/attack-simulation")} 
          />
          <SidebarItem 
            icon={<FileText className="h-5 w-5" />}
            label="Reports" 
            href="/reports" 
            isActive={isActivePath("/reports")}
          />
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            href="/settings" 
            isActive={isActivePath("/settings")} 
          />
          
          <div className="pt-6 mt-6 border-t border-sidebar-border">
            <SidebarItem 
              icon={<Book className="h-5 w-5" />} 
              label="Learn" 
              href="/learn"
              isActive={isActivePath("/learn")} 
            />
          </div>
        </nav>
      </div>
      
      <div className="mt-auto p-4 text-xs text-muted-foreground border-t border-sidebar-border">
        <div>Cyber Guardian SIEM v1.0</div>
        <div>© 2025 Cyber Guardian</div>
      </div>
    </aside>
  );
}
