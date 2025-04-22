
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  AlertTriangle,
  Activity,
  FileText,
  Settings,
  Book,
  Database,
  Network,
  Shield,
  Bug,
  Terminal,
  Layers,
  Users,
  Zap,
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 pt-2 pb-4">
          <div className="h-9 w-9 rounded bg-primary flex items-center justify-center shadow">
            <span className="text-white font-extrabold text-lg">SH</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground">SIEM HOME LAB</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/alerts")}>
                  <Link to="/alerts">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Alerts
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/investigations")}>
                  <Link to="/investigations">
                    <Search className="mr-2 h-5 w-5" />
                    Investigations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/attack-simulation")}>
                  <Link to="/attack-simulation">
                    <Activity className="mr-2 h-5 w-5" />
                    Attack Simulation
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")}>
                  <Link to="/reports">
                    <FileText className="mr-2 h-5 w-5" />
                    Reports
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link to="/settings">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Professional Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Database className="mr-2 h-5 w-5" />
                    Log Explorer
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Shield className="mr-2 h-5 w-5" />
                    Threat Intelligence
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Network className="mr-2 h-5 w-5" />
                    Network Monitor
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Bug className="mr-2 h-5 w-5" />
                    Forensics Sandbox
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Terminal className="mr-2 h-5 w-5" />
                    Live Terminal
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Zap className="mr-2 h-5 w-5" />
                    Automation
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Users className="mr-2 h-5 w-5" />
                    User Directory
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/learn">
                    <Book className="mr-2 h-5 w-5" />
                    Learn
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-4 text-xs text-muted-foreground">
        <div>SIEM HOME LAB v1.0</div>
        <div>© 2025 SIEM HOME LAB</div>
      </SidebarFooter>
    </Sidebar>
  );
}
