
import { Layout } from "@/components/layout/Layout";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { AlertsOverview } from "@/components/dashboard/AlertsOverview";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { EventsOverview } from "@/components/dashboard/EventsOverview";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { Activity, Shield, AlertTriangle, Clock } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time security monitoring and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard 
          title="Active Threats" 
          icon={<AlertTriangle className="h-4 w-4 text-cyber-danger" />}
          variant="danger"
        >
          <div className="text-3xl font-bold">3</div>
          <p className="text-sm text-muted-foreground">2 high, 1 critical</p>
        </StatusCard>
        
        <StatusCard 
          title="Monitored Systems" 
          icon={<Shield className="h-4 w-4 text-cyber-info" />}
          variant="info"
        >
          <div className="text-3xl font-bold">24</div>
          <p className="text-sm text-muted-foreground">23 secure, 1 at risk</p>
        </StatusCard>
        
        <StatusCard 
          title="Events Today" 
          icon={<Activity className="h-4 w-4 text-cyber-accent" />}
        >
          <div className="text-3xl font-bold">12,842</div>
          <p className="text-sm text-muted-foreground">+10.3% from yesterday</p>
        </StatusCard>
        
        <StatusCard 
          title="Last Attack" 
          icon={<Clock className="h-4 w-4 text-cyber-warning" />}
          variant="warning"
        >
          <div className="text-lg font-bold">Brute Force</div>
          <p className="text-sm text-muted-foreground">2 hours ago</p>
        </StatusCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ThreatMap />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventsOverview />
            <AlertsOverview />
          </div>
        </div>
        
        <div className="space-y-6">
          <SystemStatus />
          
          <div className="cyber-terminal">
            <div className="text-xs mb-1 text-muted-foreground">Recent Activity Log</div>
            <div className="space-y-2 text-xs">
              <div className="terminal-cursor">
                [2025-04-22 10:13:54] ALERT: Multiple failed login attempts from IP 192.168.1.105
              </div>
              <div>
                [2025-04-22 10:12:30] INFO: User admin logged in successfully
              </div>
              <div>
                [2025-04-22 10:05:12] INFO: Scheduled system scan completed
              </div>
              <div>
                [2025-04-22 09:58:46] WARN: Unusual outbound connection to port 4444
              </div>
              <div>
                [2025-04-22 09:45:33] INFO: Log collection service restarted
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
