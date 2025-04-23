import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth/Auth";
import Alerts from "./pages/alerts/Alerts";
import Investigations from "./pages/investigations/Investigations";
import AttackSimulation from "./pages/attack-simulation/AttackSimulation";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import Learn from "./pages/learn/Learn";
import Profile from "./pages/profile/Profile";
import Unauthorized from "./pages/Unauthorized";

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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes - All users can access everything now */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/alerts" element={
                <ProtectedRoute>
                  <Alerts />
                </ProtectedRoute>
              } />
              <Route path="/investigations" element={
                <ProtectedRoute>
                  <Investigations />
                </ProtectedRoute>
              } />
              <Route path="/attack-simulation" element={
                <ProtectedRoute>
                  <AttackSimulation />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } />
              
              {/* Professional Tool Routes - All users can access */}
              <Route path="/log-explorer" element={
                <ProtectedRoute>
                  <LogExplorer />
                </ProtectedRoute>
              } />
              <Route path="/threat-intelligence" element={
                <ProtectedRoute>
                  <ThreatIntelligence />
                </ProtectedRoute>
              } />
              <Route path="/network-monitor" element={
                <ProtectedRoute>
                  <NetworkMonitor />
                </ProtectedRoute>
              } />
              <Route path="/forensics" element={
                <ProtectedRoute>
                  <Forensics />
                </ProtectedRoute>
              } />
              <Route path="/terminal" element={
                <ProtectedRoute>
                  <Terminal />
                </ProtectedRoute>
              } />
              <Route path="/automation" element={
                <ProtectedRoute>
                  <Automation />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
