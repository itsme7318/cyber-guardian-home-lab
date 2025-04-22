
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Alerts from "./pages/alerts/Alerts";
import Investigations from "./pages/investigations/Investigations";
import AttackSimulation from "./pages/attack-simulation/AttackSimulation";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import Learn from "./pages/learn/Learn";

// Professional Tool Pages
import LogExplorer from "./pages/log-explorer/LogExplorer";
import ThreatIntelligence from "./pages/threat-intelligence/ThreatIntelligence";
import NetworkMonitor from "./pages/network-monitor/NetworkMonitor";
import Forensics from "./pages/forensics/Forensics";
import Terminal from "./pages/terminal/Terminal";
import Automation from "./pages/automation/Automation";
import Users from "./pages/users/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/investigations" element={<Investigations />} />
            <Route path="/attack-simulation" element={<AttackSimulation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/learn" element={<Learn />} />
            
            {/* Professional Tool Routes */}
            <Route path="/log-explorer" element={<LogExplorer />} />
            <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
            <Route path="/network-monitor" element={<NetworkMonitor />} />
            <Route path="/forensics" element={<Forensics />} />
            <Route path="/terminal" element={<Terminal />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/users" element={<Users />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
